import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
  type TransitionEvent,
} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';

import styles from './styles.module.css';

interface ImageZoomProps extends ComponentProps<'img'> {
  /** Opt out of click-to-zoom for this image. */
  noZoom?: boolean;
}

/** Images whose natural size fits inside this box are inline icons, not screenshots. */
const MIN_ZOOM_SIZE = 96;
/** Minimum gap between the zoomed image and the viewport edge. */
const VIEWPORT_MARGIN_DESKTOP = 40;
const VIEWPORT_MARGIN_MOBILE = 16;
/** Scrolling further than this while zoomed closes the lightbox. */
const SCROLL_CLOSE_THRESHOLD = 24;
/** Safety net when transitionend never fires (reduced motion, dropped frames). */
const TRANSITION_FALLBACK_MS = 320;

type Phase = 'closed' | 'opening' | 'open' | 'closing';

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ZoomData {
  target: Box;
  start: Box;
  /** Computed filter of the trigger at open time (the dark-mode dim), animated to none. */
  startFilter: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Legacy Word exports left literal markdown links inside some alt texts. */
function sanitizeAlt(alt: string | undefined): string {
  return (alt ?? '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
}

/**
 * Where the zoomed image should sit: centered, at natural resolution when it
 * fits, scaled down to the viewport when it doesn't. Never upscaled past its
 * natural size (that only blurs), unless the natural size is smaller than the
 * current rendered size — then zooming still enlarges the rendered box.
 */
function getTargetBox(img: HTMLImageElement): Box {
  const rect = img.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const margin = vw < 600 ? VIEWPORT_MARGIN_MOBILE : VIEWPORT_MARGIN_DESKTOP;
  const availWidth = Math.max(vw - margin * 2, 0);
  const availHeight = Math.max(vh - margin * 2, 0);

  const naturalWidth = img.naturalWidth || rect.width;
  const naturalHeight = img.naturalHeight || rect.height;
  const naturalScale = Math.min(availWidth / naturalWidth, availHeight / naturalHeight, 1);
  let width = naturalWidth * naturalScale;
  let height = naturalHeight * naturalScale;

  if (width < rect.width || height < rect.height) {
    const renderedScale = Math.min(availWidth / rect.width, availHeight / rect.height);
    width = rect.width * renderedScale;
    height = rect.height * renderedScale;
  }

  return {width, height, left: (vw - width) / 2, top: (vh - height) / 2};
}

/** FLIP transform mapping the centered target box back onto an in-page rect. */
function flipTransform(from: Box, target: Box): string {
  const scaleX = from.width / target.width;
  const scaleY = from.height / target.height;
  return `translate(${from.left - target.left}px, ${from.top - target.top}px) scale(${scaleX}, ${scaleY})`;
}

/**
 * Click-to-zoom image, mapped over every markdown image via
 * src/theme/MDXComponents.js. Renders a stock lazy-loading <img> (no wrapper
 * element, so `p > img + em` captions and inline placement keep working) and,
 * when activated, portals a FLIP-animated lightbox to <body>.
 *
 * An image is NOT zoomable when: `noZoom` is set, it sits inside a link, it is
 * an inline SVG placeholder (`data:image/svg+xml`), it failed to load, or its
 * natural size is icon-sized (≤96px in both dimensions).
 */
export default function ImageZoom(props: ImageZoomProps): React.ReactNode {
  const {noZoom, className, alt, onClick, onKeyDown, onLoad, ...imgProps} = props;
  const imgRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef(true);
  const openedViaKeyboardRef = useRef(false);
  const phaseRef = useRef<Phase>('closed');
  const [phase, setPhase] = useState<Phase>('closed');
  const [zoomable, setZoomable] = useState(false);
  const [zoomData, setZoomData] = useState<ZoomData | null>(null);
  const [closeBox, setCloseBox] = useState<Box | null>(null);

  phaseRef.current = phase;
  const isOpen = phase !== 'closed';

  const evaluateZoomability = useCallback(() => {
    const img = imgRef.current;
    if (!img || noZoom) {
      return;
    }
    if (img.src.startsWith('data:image/svg+xml')) {
      return;
    }
    if (img.closest('a') !== null) {
      return;
    }
    if (!img.complete || img.naturalWidth === 0) {
      return;
    }
    if (img.naturalWidth <= MIN_ZOOM_SIZE && img.naturalHeight <= MIN_ZOOM_SIZE) {
      return;
    }
    setZoomable(true);
  }, [noZoom]);

  useEffect(() => {
    evaluateZoomability();
  }, [evaluateZoomability]);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      evaluateZoomability();
      onLoad?.(event);
    },
    [evaluateZoomability, onLoad],
  );

  const finalizeClose = useCallback(() => {
    // Eager, so the focus() call below can't re-enter closeZoom via focusin.
    phaseRef.current = 'closed';
    const img = imgRef.current;
    if (img) {
      img.style.visibility = '';
      // Refocus the trigger only for keyboard users closing deliberately:
      // mouse users would see a focus ring appear out of nowhere, and after a
      // scroll-away close a refocused trigger makes the next Space keypress
      // reopen the lightbox instead of scrolling the page. Restore visibility
      // first — a still-hidden element silently refuses focus.
      if (restoreFocusRef.current && openedViaKeyboardRef.current) {
        img.focus({preventScroll: true});
      }
    }
    setPhase('closed');
    setZoomData(null);
    setCloseBox(null);
  }, []);

  const closeZoom = useCallback(
    (restoreFocus: boolean) => {
      if (phaseRef.current !== 'open' && phaseRef.current !== 'opening') {
        return;
      }
      restoreFocusRef.current = restoreFocus;
      const img = imgRef.current;
      if (!img || prefersReducedMotion()) {
        finalizeClose();
        return;
      }
      setCloseBox(img.getBoundingClientRect());
      setPhase('closing');
    },
    [finalizeClose],
  );

  const handleDismiss = useCallback(() => closeZoom(true), [closeZoom]);

  const openZoom = useCallback(() => {
    const img = imgRef.current;
    if (!img || phaseRef.current !== 'closed') {
      return;
    }
    const start = img.getBoundingClientRect();
    if (start.width === 0 || start.height === 0) {
      return;
    }
    restoreFocusRef.current = true;
    const computedFilter = window.getComputedStyle(img).filter;
    setZoomData({
      target: getTargetBox(img),
      start,
      startFilter: computedFilter === 'none' ? '' : computedFilter,
    });
    setPhase(prefersReducedMotion() ? 'open' : 'opening');
  }, []);

  // Hide the original while its zoomed twin is on screen; the cleanup also
  // covers unmounting mid-zoom (route change, tab switch).
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const img = imgRef.current;
    if (!img) {
      return undefined;
    }
    img.style.visibility = 'hidden';
    return () => {
      img.style.visibility = '';
    };
  }, [isOpen]);

  // Two frames after the lightbox mounts at the trigger's position, release it
  // toward the center — the CSS transition does the rest. The timeout is a
  // fallback for hidden tabs, where rAF never fires.
  useEffect(() => {
    if (phase !== 'opening') {
      return undefined;
    }
    let secondFrame: number | undefined;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setPhase('open'));
    });
    const timer = window.setTimeout(() => setPhase('open'), 100);
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) {
        cancelAnimationFrame(secondFrame);
      }
      window.clearTimeout(timer);
    };
  }, [phase]);

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus({preventScroll: true});
    }
  }, [isOpen]);

  // While open: Escape closes, Tab is inert (the dialog holds no controls —
  // any click closes it), and scrolling away dismisses — same as hovering
  // off a magnifier. Resizing invalidates the cached boxes, so close then too.
  useEffect(() => {
    if (phase !== 'open' && phase !== 'opening') {
      return undefined;
    }
    const startScrollY = window.scrollY;
    let wheelDistance = 0;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeZoom(true);
      } else if (event.key === 'Tab') {
        event.preventDefault();
      }
    };
    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY) > SCROLL_CLOSE_THRESHOLD) {
        closeZoom(false);
      }
    };
    const handleWheel = (event: WheelEvent) => {
      wheelDistance += Math.abs(event.deltaY);
      if (wheelDistance > SCROLL_CLOSE_THRESHOLD) {
        closeZoom(false);
      }
    };
    const handleTouchMove = () => closeZoom(false);
    const handleResize = () => closeZoom(false);
    // Global shortcuts (Cmd/Ctrl+K search, "/") can move focus behind the
    // overlay into an invisible control — yield instead of fighting them.
    const handleFocusIn = (event: FocusEvent) => {
      const overlay = overlayRef.current;
      if (overlay && event.target instanceof Node && !overlay.contains(event.target)) {
        closeZoom(false);
      }
    };

    document.addEventListener('keydown', handleKeydown, true);
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('wheel', handleWheel, {passive: true});
    window.addEventListener('touchmove', handleTouchMove, {passive: true});
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, closeZoom]);

  // Safety net: finalize even if transitionend is swallowed.
  useEffect(() => {
    if (phase !== 'closing') {
      return undefined;
    }
    const timer = window.setTimeout(finalizeClose, TRANSITION_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [phase, finalizeClose]);

  const handleTriggerClick = useCallback(
    (event: ReactMouseEvent<HTMLImageElement>) => {
      onClick?.(event);
      openedViaKeyboardRef.current = false;
      openZoom();
    },
    [onClick, openZoom],
  );

  const handleTriggerKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLImageElement>) => {
      onKeyDown?.(event);
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openedViaKeyboardRef.current = true;
        openZoom();
      }
    },
    [onKeyDown, openZoom],
  );

  const handleZoomedTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLImageElement>) => {
      if (event.target === event.currentTarget && event.propertyName === 'transform' && phaseRef.current === 'closing') {
        finalizeClose();
      }
    },
    [finalizeClose],
  );

  const cleanAlt = sanitizeAlt(alt);
  const triggerA11yProps = zoomable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        'aria-haspopup': 'dialog' as const,
        onKeyDown: handleTriggerKeyDown,
        ...(cleanAlt === ''
          ? {
              'aria-label': translate({
                id: 'theme.ImageZoom.triggerFallbackLabel',
                message: 'Enlarge image',
                description: 'Accessible name for a zoomable image without alt text',
              }),
            }
          : {}),
      }
    : {onKeyDown};

  let lightbox: React.ReactNode = null;
  if (isOpen && zoomData) {
    const {target, start, startFilter} = zoomData;
    const atRest = phase === 'open';
    const flipBox = phase === 'closing' ? (closeBox ?? start) : start;
    const zoomedStyle: CSSProperties = {
      top: target.top,
      left: target.left,
      width: target.width,
      height: target.height,
      transform: atRest ? 'none' : flipTransform(flipBox, target),
      filter: atRest || startFilter === '' ? 'none' : startFilter,
    };
    lightbox = createPortal(
      <div
        ref={overlayRef}
        tabIndex={-1}
        className={clsx(styles.overlay, atRest && styles.overlayOpen)}
        role="dialog"
        aria-modal="true"
        aria-label={
          cleanAlt ||
          translate({
            id: 'theme.ImageZoom.dialogLabel',
            message: 'Enlarged image',
            description: 'Accessible name for the image lightbox dialog',
          })
        }
        onClick={handleDismiss}>
        <div className={styles.backdrop} aria-hidden="true" />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={imgProps.src}
          alt=""
          aria-hidden="true"
          className={styles.zoomedImg}
          style={zoomedStyle}
          onTransitionEnd={handleZoomedTransitionEnd}
        />
      </div>,
      document.body,
    );
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        decoding="async"
        loading="lazy"
        alt={alt}
        {...imgProps}
        ref={imgRef}
        className={clsx(className, styles.img, zoomable && styles.zoomTrigger)}
        onLoad={handleLoad}
        onClick={zoomable ? handleTriggerClick : onClick}
        {...triggerA11yProps}
      />
      {lightbox}
    </>
  );
}

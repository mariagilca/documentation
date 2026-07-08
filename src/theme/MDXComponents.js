import MDXComponents from '@theme-original/MDXComponents';
import ImageZoom from '@site/src/components/ImageZoom';

// Every markdown image (![alt](src)) becomes click-to-zoom. Literal JSX <img>
// tags in .mdx files are NOT remapped by MDX and stay plain — that is also the
// author-side opt-out, alongside the component's own `noZoom` prop.
export default {
  ...MDXComponents,
  img: ImageZoom,
};

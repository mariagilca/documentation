import React from 'react';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

/*
 * "Get an AI summary" — a small footer widget (GitBook-style) that opens ChatGPT,
 * Claude, or Perplexity pre-loaded with a prompt asking the assistant to
 * summarize OpenLM for an evaluator. Each link is user-initiated and carries
 * only the static prompt below — no page or user data.
 *
 * The icons are the providers' real brand marks (derived from their logos into
 * alpha masks under static/img/ai/*-mark.png) rendered in a single theme-aware
 * grey via CSS mask-image + currentColor — bare marks, no tiles.
 */

const TARGETS = [
  {name: 'ChatGPT', base: 'https://chatgpt.com/?q=', mask: '/img/ai/openai-mark.png'},
  {name: 'Claude', base: 'https://claude.ai/new?q=', mask: '/img/ai/claude-mark.png'},
  {name: 'Perplexity', base: 'https://www.perplexity.ai/search?q=', mask: '/img/ai/perplexity-mark.png'},
];

export default function AiSummary() {
  const {withBaseUrl} = useBaseUrlUtils();
  const prompt = translate({
    id: 'footer.aiSummary.prompt',
    message:
      'Summarize OpenLM for an IT and software asset manager evaluating tools for software license monitoring, usage optimization, and compliance across engineering, scientific, and enterprise environments. Reference the documentation at https://openlm.com/documentation/.',
  });
  const q = encodeURIComponent(prompt);

  return (
    <div className={styles.aiSummary}>
      <p className={styles.label}>
        {translate({id: 'footer.aiSummary.title', message: 'Get an AI summary'})}
      </p>
      <div className={styles.icons}>
        {TARGETS.map(({name, base, mask}) => {
          const label = translate(
            {id: 'footer.aiSummary.open', message: 'Summarize OpenLM in {tool}'},
            {tool: name},
          );
          const maskUrl = `url(${withBaseUrl(mask)})`;
          return (
            <Link
              key={name}
              className={styles.iconLink}
              href={`${base}${q}`}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}>
              <span
                className={styles.icon}
                style={{WebkitMaskImage: maskUrl, maskImage: maskUrl}}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

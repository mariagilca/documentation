const fs = require('fs');
const path = require('path');
const globby = require('globby');

const WORDS_PER_MINUTE = 200;

function stripMarkdown(content) {
  return content
    .replace(/^---[\s\S]*?---/m, '') // frontmatter
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '') // MDX imports
    .replace(/export\s+.*?;/g, '') // MDX exports
    .replace(/<[^>]*>/g, '') // HTML/JSX tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links → text
    .replace(/#{1,6}\s/g, '') // headings
    .replace(/[*_~]+/g, '') // bold/italic
    .replace(/>\s/g, '') // blockquotes
    .replace(/[-*+]\s/g, '') // list markers
    .replace(/\|.*\|/g, '') // tables
    .replace(/\n{2,}/g, '\n');
}

function countWords(text) {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

module.exports = function readingTimePlugin(context, options) {
  const docsDirectories = options.docsDirectories || [
    {path: 'docs/cloud', id: 'cloud'},
    {path: 'docs/legacy', id: 'legacy'},
  ];

  return {
    name: 'reading-time-plugin',

    async loadContent() {
      const readingTimes = {};

      for (const {path: docsDir, id} of docsDirectories) {
        readingTimes[id] = {};
        const fullDir = path.join(context.siteDir, docsDir);

        if (!fs.existsSync(fullDir)) continue;

        const files = await globby(['**/*.{md,mdx}'], {cwd: fullDir});

        for (const file of files) {
          const filePath = path.join(fullDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const stripped = stripMarkdown(content);
          const wordCount = countWords(stripped);
          const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

          // Generate doc ID matching Docusaurus convention
          const docId = file
            .replace(/\.(md|mdx)$/, '')
            .replace(/\/index$/, '');

          readingTimes[id][docId] = minutes;
        }
      }

      return readingTimes;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};

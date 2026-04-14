const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');
const globby = require('globby');

function getGitLastUpdated(filePath) {
  try {
    const timestamp = execSync(
      `git log -1 --format=%ct "${filePath}"`,
      {encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore']},
    ).trim();
    return timestamp ? Number(timestamp) : undefined;
  } catch {
    return undefined;
  }
}

module.exports = function lastUpdatedPlugin(context, options) {
  const docsDirectories = options.docsDirectories || [
    {path: 'docs/cloud', id: 'cloud'},
    {path: 'docs/legacy', id: 'legacy'},
  ];

  return {
    name: 'last-updated-plugin',

    async loadContent() {
      const lastUpdated = {};

      for (const {path: docsDir, id} of docsDirectories) {
        lastUpdated[id] = {};
        const fullDir = path.join(context.siteDir, docsDir);

        if (!fs.existsSync(fullDir)) continue;

        const files = await globby(['**/*.{md,mdx}'], {cwd: fullDir});

        for (const file of files) {
          const filePath = path.join(fullDir, file);
          const timestamp = getGitLastUpdated(filePath);

          const docId = file
            .replace(/\.(md|mdx)$/, '')
            .replace(/\/index$/, '');

          if (timestamp) {
            lastUpdated[id][docId] = timestamp;
          }
        }
      }

      return lastUpdated;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};

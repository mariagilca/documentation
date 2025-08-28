const fs = require('fs');
const path = require('path');

const BASE = '/Users/anamariagilca/projects/docs/docs';
const DATA_PATH = path.join(BASE, 'src/static/supported-software.json');
const OUT_BASE = path.join(BASE, 'docs/cloud/interfacing-lms');
const FOLDERS = {
  saas: 'saas-platforms',
  lms: 'engineering-lms'
};

function slugify(name) {
  return name
    .toString()
    .toLowerCase()
    .replace(/[/\\+,&:()@'"]/g, '')   // remove problematic chars
    .replace(/[^a-z0-9]+/g, '-')      // replace non-alphanum with hyphen
    .replace(/^-+|-+$/g, '')          // trim
    .replace(/-+/g, '-');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function makeMdxContent(title, link, slug) {
  return `---
title: "${title}"
learnMoreLink: "${link}"
slug: "${slug}"
---

# ${title}

Placeholder: integration guide coming soon. Add details, examples and configuration for ${title} here.
`;
}

function writeIfNotExists(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log('Skipping (exists):', filePath);
    return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', filePath);
  return true;
}

function buildIndexFile(title, entries, intro) {
  const lines = [
    '---',
    `title: "${title}"`,
    '---',
    '',
    `# ${title}`,
    '',
    intro || '',
    '',
    'To (re)generate pages, run: node scripts/generate-supported-software-mdx.js',
    '',
    '## Pages',
    ''
  ];
  for (const e of entries) {
    lines.push(`- [${e.title}](./${e.slug})`);
  }
  return lines.join('\n') + '\n';
}

function buildLearnMorePath(folderName, slug) {
  // use site path where MDX will be available
  return `/cloud/interfacing-lms/${folderName}/${slug}`;
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('Data file not found:', DATA_PATH);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  const saasDir = path.join(OUT_BASE, FOLDERS.saas);
  const lmsDir = path.join(OUT_BASE, FOLDERS.lms);
  ensureDir(saasDir);
  ensureDir(lmsDir);

  const saasEntries = [];
  const lmsEntries = [];

  if (Array.isArray(data.saasPlatforms)) {
    for (const item of data.saasPlatforms) {
      const title = String(item.title || 'untitled');
      const slug = slugify(title) || 'untitled';
      const filePath = path.join(saasDir, `${slug}.mdx`);
      const link = buildLearnMorePath(FOLDERS.saas, slug);
      const content = makeMdxContent(title, link, slug);
      writeIfNotExists(filePath, content);
      // update the JSON entry to point to generated MDX location
      item.learnMoreLink = link;
      saasEntries.push({ title, slug });
    }
  }

  if (Array.isArray(data.licenseManagers)) {
    for (const item of data.licenseManagers) {
      const title = String(item.title || 'untitled');
      const slug = slugify(title) || 'untitled';
      const filePath = path.join(lmsDir, `${slug}.mdx`);
      const link = buildLearnMorePath(FOLDERS.lms, slug);
      const content = makeMdxContent(title, link, slug);
      writeIfNotExists(filePath, content);
      // update the JSON entry to point to generated MDX location
      item.learnMoreLink = link;
      lmsEntries.push({ title, slug });
    }
  }

  // write or overwrite index files so they reflect current entries
  fs.writeFileSync(path.join(saasDir, 'index.mdx'), buildIndexFile('saas-platforms', saasEntries, 'This folder contains placeholder integration pages for supported SaaS platforms.'), 'utf8');
  console.log('Wrote index for saas-platforms');

  fs.writeFileSync(path.join(lmsDir, 'index.mdx'), buildIndexFile('engineering-lms', lmsEntries, 'This folder contains placeholder integration pages for supported engineering license managers.'), 'utf8');
  console.log('Wrote index for Engineering license managers');

  // persist updated learnMoreLink values back to supported-software.json
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('Updated learnMoreLink values in:', DATA_PATH);
  } catch (err) {
    console.error('Failed to update JSON:', err);
  }
}

main();

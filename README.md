# OpenLM official documentation website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Table of contents

- [How update documentation](#how-update-documentation)
- [Documentation structure](#documentation-structure)
- [How to start the docusaurus website locally](#how-to-start-the-docusaurus-website-locally)
- [How to update content for translation (currently only Japanese supported)](#how-to-update-content-for-translation-currently-only-japanese-supported)
- [Work environment setup](#work-environment-setup)
    - [macOS](#macos)
    - [Windows WSL (Windows Subsystem for Linux)](#windows-wsl-windows-subsystem-for-linux)
    - [Ubuntu](#ubuntu)

# How update documentation

Ensure you have the work environment ready [Work environment setup](#work-environment-setup)


## Documentation structure

Documentation is grouped in 3 documentation sets:

1. Cloud documentation (Annapurna) - `./docs/cloud`
2. On-premise documentation (Annapurna) - `./docs/onpremise`
3. Legacy documentation -  `./docs/legacy`

The documentation is written using md and mdx format.
For more details consult the [Docusaurus documentation on docs](https://docusaurus.io/docs/create-doc)

## How to start the docusaurus website locally

1. Install npm dependencies

```
npm install
```

2. Start Docusaurus in development mode

```
npm run start
```

It will compile the website, and open the website http://localhost:3000/documentation/

Any change to documentation will be reflected instantly in the browser.

This will work only for the English locale.

To launch in Japanense locale, run:

```
npm run start -- --locale ja
```

## How to update content for translation (currently only Japanese supported)

1. Ensure that Japanese is enabled in the docusaurus.config.js.

The 'ja' must be present in the locales list.
```
    locales: ['en','ja'],
```

2. Extract all content to be translated from docs using the command below.

This step is required only after adding new content or updating the existing one in the docs or pages.

Run the command below:

```
npm run write-translations -- --locale ja
```

Any changes to content will required new translation updates, even if those are just character case changes.

3. Translate all content from `./i18n/ja/docusaurus-plugin-content-docs`

4. Propagate the new translations to docusuaurus specific locations:

From the root folder of the git repository (e.g. the location where docusaurus.config.json is located), execute:

```
cd ./i18n/ja
sh update-docs.sh
```

5. Launch Docusaurus for Japanense locale:

```
npm run start -- --locale ja
```

This will load only the Japanese localisation.

# Work environment setup

Setting working environment with Docusaurus requires several pre-requisites.
Follow the section applicable to you.

## macOS

1. Install [brew](https://formulae.brew.sh/) package manager

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
export PATH="/usr/local/bin:$PATH"
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
```

2. Install git
```
brew install git
```

3. Install [Node with npm](https://nodejs.org/)

```
brew install node
```

## Windows WSL (Windows Subsystem for Linux)

1. Install WSL (Windows Subsystem for Linux)

Open PowerShell as Administrator and run:

```
wsl --install
```

2. Install git in WSL

```
sudo apt update && sudo apt install git
```

3. Install [Node with npm](https://nodejs.org/)

```
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

## Ubuntu

2. Install git

```
sudo apt update && sudo apt install git
```

3. Install [Node with npm](https://nodejs.org/)

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

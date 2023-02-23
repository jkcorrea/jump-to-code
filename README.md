# 🦘 Jump to Code

A dead simple browser extension that allows you to jump from a file in GitHub to that file in your local workspace.

I was already working on a Chrome extension when I saw [this tweet](https://twitter.com/jarredsumner/status/1628513557980794882) & decided I could fix this!


https://user-images.githubusercontent.com/1787115/220835559-8152e558-1844-46d6-88e4-7c19e3bf250e.mp4


> **⚠️WARNING⚠️** this extension is very unfinished. I've only tested it on my machine and it barely works at that. I welcome contributions and don't plan to spend any more time on this unless someone begs me to.

## How it works

This extension only works with VSCode installed. Also I doubt it works on Windows right now. (Is that you drafting a PR I hear??)

1. Open a GitHub repo (like this one!)
1. Open a file in that repo
1. Click the `...` on a line number
1. Click "Jump to code..."
1. ???
1. Profit!

## Development

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

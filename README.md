# woo-pharmacy

Interactive pharmacy study website covering seven subjects, flashcards, and quizzes.

## Local Preview

Open `pharmacy-study/index.html` in a browser. No build is required.

## Checks

Requires Node.js 22 or newer.

```sh
npm ci
npm test
npm run deploy:check
```

## Cloudflare Deployment

This project uses Cloudflare Workers Static Assets. Only `pharmacy-study/`
is published; its `tools/` directory is excluded by `.assetsignore`.

```sh
npx wrangler login
npm run deploy
```

The deployment config binds `pharmacy.wooafterwork.com`. The Cloudflare account
must own the active `wooafterwork.com` zone. An existing conflicting DNS record
must be resolved before binding the custom domain. Cloudflare manages DNS and TLS.

For automatic deployments, connect `cht-hanchen/woo-pharmacy` in Cloudflare
Workers & Pages using Workers Builds, select `main`, keep the root directory
at the repository root, use `npm test` as the build command, and
`npm run deploy` as the deploy command.

## Local-Only Files

`_local/`, `.claude/`, credentials, dependencies, and Wrangler state are ignored.
The existing image, video, and archive ignore rules keep local reference media
out of Git. Explicitly allow any future media needed by the website before deploying.

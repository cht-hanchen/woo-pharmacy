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

## Continuous Integration

GitHub Actions runs `.github/workflows/ci.yml` for pushes to `main`, pull
requests targeting `main`, and manual runs. It checks Node.js 22 and 24 with
`npm ci`, `npm test`, and `npm run deploy:check`.

The checks do not require Cloudflare credentials. After both Node.js checks pass,
pushes to `main` and manual runs on `main` deploy the website. Pull requests never
deploy to production.

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

Automatic deployment follows the `woo-astro` GitHub Actions convention: a separate
deploy job, Node.js 22.12.0, and the `CLOUDFLARE` GitHub environment. This site
remains on Workers Static Assets rather than Astro's Cloudflare Pages setup.

In the GitHub repository's Settings > Environments, create `CLOUDFLARE` and add:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token scoped to the deployment account
	and the `wooafterwork.com` zone, using the Edit Cloudflare Workers template
	with permissions for the configured custom domain.
- `CLOUDFLARE_ACCOUNT_ID`: the account that owns the existing `woo-pharmacy` Worker.

Secrets in `woo-astro` are not automatically shared with this repository. Enter
values directly in GitHub, never in source files or chat. Do not also enable
Workers Builds for this repository, to avoid duplicate deployments.

## Local-Only Files

`_local/`, `.claude/`, credentials, dependencies, and Wrangler state are ignored.
The existing image, video, and archive ignore rules keep local reference media
out of Git. Explicitly allow any future media needed by the website before deploying.

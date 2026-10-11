# Modding Hub — starter

A small, static-first indie studio website built with Astro and deployed to GitHub Pages.

## First milestone

- Studio homepage
- Minecraft Cannabis project page
- Direct links to the project's GitHub repository, latest release, player guide, changelog, and issue tracker
- Responsive layout with no client-side JavaScript framework
- Automated GitHub Pages deployment

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

## Build and test

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a separate public repository for the website, e.g. `modding-hub`.
2. Copy these files into that repository and push the default branch as `main`.
3. In repository Settings → Pages, set Build and deployment → Source to **GitHub Actions**.
4. Update `site` in `astro.config.mjs` after choosing your real domain.
5. Add your custom domain under Settings → Pages after the site has deployed.
6. Configure DNS at your domain registrar using GitHub's current instructions.

The deployment workflow publishes the generated `dist/` directory. It does not need a server, database, bot token, or other secret.

## Content ownership

GitHub remains the source of truth for the mod's code, releases, issue reports, and changelog. The site links visitors to those sources rather than copying release files or hosting its own downloads.

## Before launch

- Replace `YOUR-DOMAIN.example` in `astro.config.mjs`.
- Replace the placeholder studio name with the final studio/alias.
- Add original screenshots or approved project images to `public/images/`.
- Verify all GitHub links and mobile layout.
- Keep project claims and compatibility details aligned with the mod README and release notes.

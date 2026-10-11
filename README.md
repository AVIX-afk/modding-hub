# AVIX Studio website

The studio site for AVIX Studio: every project, its downloads and guides, server status and community links in one place. It's a static site built with [Astro](https://astro.build) and published to GitHub Pages automatically.

The site isn't tied to any one game. Each project brings its own color, platform and links, and the studio shell stays neutral.

## How it works

- **Projects** are Markdown files in `src/content/projects/`. Each file becomes a page and a card.
- **Release versions and dates** are read from each project's GitHub release when the site builds. The site rebuilds on every push to `main` and once a day, so new releases show up without touching this repo.
- **Downloads** always link to the project's own GitHub Releases. The site never hosts copies.
- **Servers** are listed in `src/data/servers.json`. While the list is empty, server sections stay hidden.
- **Studio name, tagline and social links** live in `src/site.config.ts`. A link set to `null` is hidden everywhere.

## Common jobs

### Add a project

1. Copy `docs/project-template.md` to `src/content/projects/<name>.md`. The file name becomes the address, for example `/projects/<name>/`.
2. Put its images in `src/assets/projects/<name>/` and point `cover` and `gallery` at them. Use real screenshots.
3. Fill in the fields and write the description under the `---` line.
4. Push to `main`. The site deploys in a minute or two.

### Add the Discord

Paste the invite URL into `discord` in `src/site.config.ts`. A Discord icon appears in the header and footer, and the homepage button switches to "Join the Discord".

### Add a game server

Add an entry to `src/data/servers.json`:

```json
[
  {
    "id": "survival",
    "name": "AVIX Survival",
    "game": "Minecraft Java Edition 26.3",
    "address": "play.example.com",
    "statusSource": "minecraft",
    "project": "cannabis",
    "note": "Runs the latest Cannabis release."
  }
]
```

- `statusSource: "minecraft"` checks the server live in the visitor's browser using the free [mcsrvstat.us](https://mcsrvstat.us) API and shows the player count.
- `statusSource: "manual"` with `"manualStatus": "online"`, `"offline"` or `"maintenance"` works for any game, such as Garry's Mod or a FiveM server, until a live check is added for it.
- `project` (optional) also lists the server on that project's page.

The homepage gets a Servers section as soon as the list has one entry.

### Use a custom domain

1. Buy the domain. Keep the game's name out of it, since game publishers don't allow domains that look official.
2. In `astro.config.mjs`, set `SITE` to `https://your-domain.com` and `BASE` to `"/"`.
3. Create `public/CNAME` containing only the domain, for example `avix.studio`.
4. In the repo's **Settings → Pages**, enter the domain, then add the DNS records GitHub shows you at your registrar.

## Run it locally

Needs Node.js 22 or newer.

```bash
npm install
npm run dev       # live preview at http://localhost:4321/modding-hub/
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Release versions are fetched from GitHub during the build. If GitHub can't be reached, pages still build and simply leave the version out.

## Publishing

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, once a day, and whenever you run it from the **Actions** tab. GitHub Pages must be set to deploy from **GitHub Actions** (**Settings → Pages → Build and deployment → Source**).

## Layout

```
src/
  site.config.ts          studio name, tagline, social links
  content/projects/       one Markdown file per project
  data/servers.json       game servers (empty hides the sections)
  assets/projects/        project images, optimized at build time
  pages/                  home, projects, project pages, about, 404
  components/             project card, server list, icons
  layouts/BaseLayout.astro  header, footer, page metadata
  styles/global.css       colors, type and shared styles
docs/project-template.md  starting point for a new project
```

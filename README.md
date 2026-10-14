# afkbird website

The studio site for [afkbird](https://afkbird.com): every project, its downloads and guides, server status and community links in one place. It's a static site built with [Astro](https://astro.build) and published to GitHub Pages automatically.

The site isn't tied to any one game. Each project brings its own color, platform and links, and the studio shell stays neutral.

## How it works

- **Projects** are Markdown files in `src/content/projects/`. Each file becomes a page and a card.
- **The homepage groups projects by type** (`kind`): one row each for Mods, Tools, Games and so on, up to three cards per row. A row appears as soon as one project of that type exists, and rows follow the projects' `order`.
- **The Projects page filters by Type and Platform** (`kind` and `platformGroup`). Filters live in the address, so links like `/projects/?type=tool&platform=windows` can be shared.
- **"What's new"** on each project page shows the latest GitHub release notes. A release with empty notes simply hides the box. `[optional]` in the notes is never shown.
- **Release versions and dates** are read from each project's GitHub release when the site builds. The site rebuilds on every push to `main` and once a day, so new releases show up without touching this repo.
- **Downloads** always link to the project's own GitHub Releases. The site never hosts copies.
- **Servers** are listed in `src/data/servers.json`. While the list is empty, server sections stay hidden.
- **Studio name, tagline and social links** live in `src/site.config.ts`. A link set to `null` is hidden everywhere.

## Common jobs

### Add a project

1. Copy `docs/project-template.md` to `src/content/projects/<name>.md`. The file name becomes the address, for example `/projects/<name>/`.
2. Put its images in `src/assets/projects/<name>/` and point `cover` and `gallery` at them. Use real screenshots.
3. Fill in the fields and write the description under the `---` line. Set `platformGroup` (Minecraft, Windows, Garry's Mod, GTA V or Other) for the filters. Set `pixelArt: false` for app screenshots or photos, and add an optional `thumb` when the cover is too busy at card size.
4. Push to `main`. The site deploys in a minute or two.

### Add the Discord

The invite URL lives in `discord` in `src/site.config.ts`. It puts a Discord icon in the header and footer and a "Join the Discord" button on the homepage, and powers `afkbird.com/discord`, a short link that forwards to the invite. Share the short link; if the invite ever changes, update this one line and every shared link keeps working. Use an invite set to never expire.

### Add a game server

Add an entry to `src/data/servers.json`. While the list is empty, every server section, the Servers page and its menu link stay hidden.

```json
[
  {
    "id": "smp",
    "name": "afkbird SMP",
    "game": "Minecraft Java Edition 26.3",
    "address": "play.afkbird.com",
    "statusSource": "minecraft",
    "project": "cannabis",
    "note": "Whitelisted survival with the Cannabis mod",
    "join": {
      "requires": [
        { "name": "Fabric Loader 0.19.5 or newer", "url": "https://fabricmc.net/use/installer/" },
        { "name": "Cannabis mod", "detail": "Same version as the server", "url": "/projects/cannabis/" }
      ],
      "whitelist": {
        "how": "Post your Minecraft username in #whitelist-requests on our Discord.",
        "url": "https://discord.gg/7kuGGyQd78",
        "label": "Request a spot on Discord"
      },
      "rules": ["Be kind to other players."]
    }
  }
]
```

- `statusSource: "minecraft"` checks the server live in the visitor's browser using the free [mcstatus.io](https://mcstatus.io) API (with [mcsrvstat.us](https://mcsrvstat.us) as a backup) and shows the player count.
- `statusSource: "manual"` with `"manualStatus": "online"`, `"offline"` or `"maintenance"` works for any game, such as Garry's Mod or a FiveM server.
- `project` (optional) also lists the server on that project's page.
- `join` (optional) creates a step-by-step guide at `/servers/<id>/`: whitelist, what to install, and how to add the server. Leave out `whitelist` for an open server and `requires` for vanilla.

### Social links, YouTube videos and the Discord card

- Links for Discord, YouTube, X and GitHub live in `src/site.config.ts` and appear in the header, footer and the homepage Community section.
- The homepage shows the three newest YouTube uploads (read from the channel's public feed using `youtubeChannelId`). The section appears by itself after the first upload.
- The Discord card reads the server name, icon and member count from the invite at build time. To show a live "online" count, turn on **Server Settings → Widget → Enable Server Widget** in Discord.

### The domain

The site is served at `afkbird.com`. The domain is set in three places that must agree: `SITE` in `astro.config.mjs`, `public/CNAME`, and the repo's **Settings → Pages → Custom domain**. DNS lives in Cloudflare (four GitHub Pages `A` records on `afkbird.com`, a `www` CNAME to the repo owner's `github.io` address, all set to **DNS only**).

### Logo and brand files

Every logo, icon and banner lives in `public/brand/` and is downloadable from `afkbird.com/brand/<file>`. The header logo is `src/assets/brand/logo.svg`. Use the `for-dark-backgrounds` versions on dark colors and the `for-light-backgrounds` versions on light ones. The bird's X eye is see-through in every file.

## Run it locally

Needs Node.js 22 or newer.

```bash
npm install
npm run dev       # live preview at http://localhost:4321/
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Release versions are fetched from GitHub during the build. If GitHub can't be reached, pages still build and simply leave the version out.

## Publishing

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, once a day, and whenever you run it from the **Actions** tab. GitHub Pages must be set to deploy from **GitHub Actions** (**Settings → Pages → Build and deployment → Source**).

## Layout

```
src/
  site.config.ts          studio name, tagline, social links, contact email
  content/projects/       one Markdown file per project
  data/servers.json       game servers (empty hides the sections)
  assets/projects/        project images, optimized at build time
  pages/                  home, projects, project pages, about, 404
  components/             project card, server list, icons
  layouts/BaseLayout.astro  header, footer, page metadata
  styles/global.css       colors, type and shared styles
  assets/brand/logo.svg   header logo
public/brand/             logos, profile picture, banners, share image
docs/project-template.md  starting point for a new project
```

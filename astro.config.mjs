import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Where the site is served from. The domain is also set in
// public/CNAME and in the repo's Settings > Pages.
const SITE = "https://afkbird.com";
const BASE = "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  output: "static",
  // Writes sitemap-index.xml at build time; public/robots.txt points to it.
  integrations: [sitemap()],
});
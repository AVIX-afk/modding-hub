import { defineConfig } from "astro/config";

// Where the site is served from. The domain is also set in
// public/CNAME and in the repo's Settings > Pages.
const SITE = "https://afkbird.com";
const BASE = "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  output: "static",
});

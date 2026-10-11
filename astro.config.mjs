import { defineConfig } from "astro/config";

// Where the site is served from.
// Right now it lives at https://avix-afk.github.io/modding-hub/
// When you connect a custom domain: set SITE to "https://your-domain.com",
// set BASE to "/", and add the domain to public/CNAME.
const SITE = "https://avix-afk.github.io";
const BASE = "/modding-hub";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  output: "static",
});

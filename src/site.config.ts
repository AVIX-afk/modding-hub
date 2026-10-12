// Studio-wide settings. Edit this file to change the name, tagline and links
// shown in the header, footer and community section.
//
// Leave a link as null to hide it everywhere. For example, the Discord link
// appears automatically once you paste an invite URL into `discord`.

export const studio = {
  name: "afkbird",
  shortName: "afkbird",
  tagline: "Mods, games and tools from an independent developer.",
  description:
    "afkbird is an independent studio making mods, games and tools. Find downloads, project guides, servers and the community in one place.",
  founded: 2026,
  links: {
    github: "https://github.com/afkbirdgames",
    // Use an invite set to never expire. The site also serves afkbird.com/discord,
    // which forwards here, so share that address instead of the raw invite.
    discord: "https://discord.gg/7kuGGyQd78" as string | null,
    youtube: "https://www.youtube.com/@afkbird" as string | null,
    x: "https://x.com/afkbird_" as string | null,
    email: "hello@afkbird.com" as string | null,
  },
  // Used to show the latest uploads on the homepage. Find it in YouTube
  // Studio > Settings > Channel > Advanced settings, or in the channel URL.
  youtubeChannelId: "UCWN856Z7Hv1IHs10CGEnBVw" as string | null,
};

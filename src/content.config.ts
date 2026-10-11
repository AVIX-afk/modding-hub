import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per project in src/content/projects/.
// The file name becomes the page address: cannabis.md -> /projects/cannabis/
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      // What it's built for, written the way players say it.
      platform: z.string(),
      kind: z.enum(["Mod", "Game", "Tool", "Script", "Plugin", "Server", "Bot"]),
      status: z.enum(["Released", "In development", "Paused", "Archived"]),
      // The project's own color. Used for its page, buttons and card details,
      // so each project keeps its identity while the studio stays neutral.
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      cover: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      // owner/name of the GitHub repo. Used to read the latest release.
      repo: z.string().optional(),
      links: z
        .object({
          download: z.string().url().optional(),
          source: z.string().url().optional(),
          guide: z.string().url().optional(),
          changelog: z.string().url().optional(),
          issues: z.string().url().optional(),
          discord: z.string().url().optional(),
        })
        .default({}),
      requirements: z
        .array(z.object({ name: z.string(), version: z.string(), url: z.string().url().optional() }))
        .default([]),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      // Shown in a callout near the top of the project page.
      contentNote: z.string().optional(),
      // Small print at the bottom of the project page, such as a
      // trademark notice for the game the project is built for.
      legal: z.string().optional(),
    }),
});

export const collections = { projects };

import { getCollection } from "astro:content";
import { z } from "astro/zod";
import serverList from "../data/servers.json";

export async function allProjects() {
  const list = await getCollection("projects");
  return list.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

// Game servers live in src/data/servers.json. While that list is empty ([]),
// every server section on the site stays hidden.
const serverSchema = z.object({
  id: z.string(),
  name: z.string(),
  game: z.string(),
  address: z.string(),
  // "minecraft": live status checked in the visitor's browser.
  // "manual": shows the manualStatus you set in the file.
  statusSource: z.enum(["minecraft", "manual"]),
  manualStatus: z.enum(["online", "offline", "maintenance"]).optional(),
  // File name of the related project, without .md (for example "cannabis").
  project: z.string().optional(),
  note: z.string().optional(),
  // Everything the "How to join" page needs. Leave out to skip that page.
  join: z
    .object({
      // What players install before joining, in order.
      requires: z.array(z.object({ name: z.string(), detail: z.string().optional(), url: z.string().optional() })).default([]),
      // How to get on the whitelist. Leave out for an open server.
      whitelist: z
        .object({
          how: z.string(), // one sentence, e.g. "Post your Minecraft username in #whitelist-requests."
          url: z.string(), // where the button goes, e.g. the Discord invite
          label: z.string(), // button text, e.g. "Request a spot on Discord"
        })
        .optional(),
      rules: z.array(z.string()).default([]),
    })
    .optional(),
});
export type Server = z.infer<typeof serverSchema>;

const servers = z.array(serverSchema).parse(serverList);

export function allServers(): Server[] {
  return servers;
}

// ---------- Project types ----------
// How each `kind` is named when it heads a list ("Mods", "Tools", ...),
// and the slug used in shareable filter links (/projects/?type=tool).
const kindPlural: Record<string, string> = {
  Mod: "Mods", Game: "Games", Tool: "Tools", Script: "Scripts", Plugin: "Plugins", Server: "Servers", Bot: "Bots",
};
export const pluralKind = (kind: string) => kindPlural[kind] ?? `${kind}s`;
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Project = Awaited<ReturnType<typeof allProjects>>[number];

// Groups projects by kind for the homepage. Groups appear in the order of their
// first project, so a project's `order` also decides which row comes first.
export function groupByKind(projects: Project[]) {
  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    if (!groups.has(p.data.kind)) groups.set(p.data.kind, []);
    groups.get(p.data.kind)!.push(p);
  }
  return [...groups].map(([kind, items]) => ({
    kind,
    label: pluralKind(kind),
    slug: slugify(kind),
    // Featured projects first, then by order.
    items: [...items].sort((a, b) => Number(b.data.featured) - Number(a.data.featured)),
    platforms: [...new Set(items.map((p) => p.data.platformGroup))].filter((g) => g !== "Other"),
  }));
}

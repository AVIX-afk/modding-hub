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

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
});
export type Server = z.infer<typeof serverSchema>;

const servers = z.array(serverSchema).parse(serverList);

export function allServers(): Server[] {
  return servers;
}

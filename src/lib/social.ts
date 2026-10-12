// Reads public YouTube and Discord data while the site builds. Both are
// optional: if a service can't be reached, the related section is simply
// left out or shown without numbers, and the build never fails.

const TIMEOUT = 8000;

// ---------- YouTube ----------

export interface Video {
  id: string;
  title: string;
  published: Date;
  url: string;
  thumbnail: string;
}

let videosCache: Promise<Video[]> | undefined;

/** Latest uploads from the channel's public feed (no API key needed),
 *  skipping anything older than `since` or listed in `hidden`. */
export function latestVideos(
  channelId: string | null,
  limit = 3,
  { since, hidden = [] }: { since?: string; hidden?: string[] } = {},
): Promise<Video[]> {
  if (!channelId) return Promise.resolve([]);
  videosCache ??= fetchVideos(channelId);
  const from = since ? new Date(since) : null;
  return videosCache.then((v) =>
    v.filter((x) => !hidden.includes(x.id) && (!from || x.published >= from)).slice(0, limit),
  );
}

async function fetchVideos(channelId: string): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) {
      console.warn(`[youtube] feed answered ${res.status}; leaving videos out.`);
      return [];
    }
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    return entries
      .map((e) => {
        const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
        const title = decode(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
        const published = e.match(/<published>([^<]+)<\/published>/)?.[1];
        if (!id || !published) return null;
        return {
          id,
          title,
          published: new Date(published),
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((v): v is Video => v !== null);
  } catch (err) {
    console.warn(`[youtube] ${(err as Error).message}; leaving videos out.`);
    return [];
  }
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// ---------- Discord ----------

export interface DiscordServer {
  id: string;
  name: string;
  icon: string | null;
  members: number | null;
  online: number | null;
}

/** Server name, icon and member counts, read from the public invite. */
export async function discordServer(inviteUrl: string | null): Promise<DiscordServer | null> {
  const code = inviteUrl?.match(/discord(?:\.gg|(?:app)?\.com\/invite)\/([\w-]+)/)?.[1];
  if (!code) return null;
  try {
    const res = await fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true`, {
      headers: { "User-Agent": "afkbird-site (https://afkbird.com)" },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) {
      console.warn(`[discord] invite lookup answered ${res.status}; showing the card without numbers.`);
      return null;
    }
    const d = await res.json();
    const g = d.guild ?? {};
    return {
      id: g.id,
      name: g.name,
      icon: g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128` : null,
      members: d.approximate_member_count ?? null,
      online: d.approximate_presence_count ?? null,
    };
  } catch (err) {
    console.warn(`[discord] ${(err as Error).message}; showing the card without numbers.`);
    return null;
  }
}

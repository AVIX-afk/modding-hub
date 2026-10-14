// Reads a project's latest GitHub release while the site builds.
// The site rebuilds on every push and once a day, so versions stay current
// without editing the site by hand. If GitHub can't be reached, the page
// still builds and simply leaves the version out.

import { Marked } from "marked";

export interface Release {
  version: string;
  name: string;
  url: string;
  publishedAt: Date;
  // The release notes rendered to HTML, or null when the release has none.
  notesHtml: string | null;
}

// Release notes are Markdown written on GitHub. Raw HTML in them is shown as
// text rather than run, and the "[optional]" marker Nestsweep reads is hidden.
const notes = new Marked({ gfm: true, breaks: false });
notes.use({
  renderer: {
    html: ({ text }) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
  },
});
function renderNotes(body: unknown): string | null {
  if (typeof body !== "string") return null;
  const clean = body.replace(/\[optional\]/gi, "").trim();
  return clean ? (notes.parse(clean) as string) : null;
}

const cache = new Map<string, Promise<Release | null>>();

export function latestRelease(repo: string | undefined): Promise<Release | null> {
  if (!repo) return Promise.resolve(null);
  if (!cache.has(repo)) cache.set(repo, fetchRelease(repo));
  return cache.get(repo)!;
}

async function fetchRelease(repo: string): Promise<Release | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "avix-studio-site",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`[releases] ${repo}: GitHub answered ${res.status}; building without a version.`);
      return null;
    }
    const data = await res.json();
    return {
      version: String(data.tag_name ?? "").replace(/^v/i, ""),
      name: data.name ?? data.tag_name,
      url: data.html_url,
      publishedAt: new Date(data.published_at),
      notesHtml: renderNotes(data.body),
    };
  } catch (err) {
    console.warn(`[releases] ${repo}: ${(err as Error).message}; building without a version.`);
    return null;
  }
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

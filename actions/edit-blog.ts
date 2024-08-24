import { DEFAULT_WEBSITE_URL } from "@/constants";

export async function editBlog({ slug, mode }: { slug: string, mode: string }) {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/blog/${slug}?mode=${mode}`, {
        next: { tags: ["blogs"]}, cache: "force-cache",
      });
    if (!res.ok) {
      return []
    }
    return res.json();
  }
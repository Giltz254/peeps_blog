import { DEFAULT_WEBSITE_URL } from "@/constants";

export async function getData({ slug }: { slug: string }) {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/blog/${slug}`, {
        next: { tags: ["blogs"]}, cache: "force-cache"
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  }
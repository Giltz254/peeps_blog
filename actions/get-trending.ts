import { DEFAULT_WEBSITE_URL } from "@/constants";

export async function getTrendingPosts() {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/trending`, {
        next: { tags: ["blogs"]}, cache: "force-cache"
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  }
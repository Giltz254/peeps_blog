import { DEFAULT_WEBSITE_URL } from "@/constants";

export async function getCategoryData(tag: string, page: number ) {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/tags/${tag}?page=${page}`, {
        next: { tags: ["blogs"]}, cache: "force-cache"
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  }
import { DEFAULT_WEBSITE_URL } from "@/constants";

export async function getUniqueTags() {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/tags`, {
        next: { tags: ["blogs"]}, cache: "force-cache"
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  }
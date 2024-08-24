import { DEFAULT_WEBSITE_URL } from "@/constants";

export const getBlogs = async(page: number) => {
    const res = await fetch(`${DEFAULT_WEBSITE_URL}/api/blog?page=${page}`, {
      next: { tags: ["blogs"]}, cache: "force-cache"
    })
    if (!res.ok) {
      return [];
    }
    return res.json();
  }
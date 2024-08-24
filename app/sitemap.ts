import { DEFAULT_WEBSITE_URL } from "@/constants";
import { MetadataRoute } from "next";
type sitemapProps = {
    slug: string;
    title: string;
    updatedAt: Date;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch(`${DEFAULT_WEBSITE_URL}/api/sitemap`, {
        next: { tags: ["blogs"] }, cache: "force-cache"
    })
    const blogs: sitemapProps[] = await response.json();
    const blogEntries: MetadataRoute.Sitemap = blogs.length > 0 
        ? blogs.map(({ slug, updatedAt }) => ({
            url: `${DEFAULT_WEBSITE_URL}/blog/${slug}`,
            lastModified: updatedAt ? new Date(updatedAt) : new Date(),
        }))
        : [
            {
                url: `${DEFAULT_WEBSITE_URL}/`
            }
        ]
    return [
        {
            url: `${DEFAULT_WEBSITE_URL}/privacy`
        },
        {
            url: `${DEFAULT_WEBSITE_URL}/contact`
        },
        ...blogEntries
    ]
}
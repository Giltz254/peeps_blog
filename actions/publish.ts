"use server";

import { DEFAULT_WEBSITE_URL, slugify } from "@/constants";
import { currentUser } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import Blog from "@/models/blog";
type Blog = {
  title: string;
  banner: string;
  des: string;
  content: any[];
  tags: string[];
  draft: boolean;
};

export const publishBlogAction = async ({
  blogObj,
  slug,
}: {
  blogObj: Blog;
  slug: string | undefined;
}) => {
  const session = await currentUser();

  if (!session) {
    return { error: "Please log in to continue!" };
  }
  if (session.role !== "ADMIN") {
    return { error: "Protected route only admins can create blogs!" };
  }
  if (!blogObj.title) {
    return { error: "Fill in the blog title!" };
  }
  if (!blogObj.des) {
    return { error: "Fill in the blog description!" };
  }
  if (!blogObj.tags.length || blogObj.tags.length > 10) {
    return { error: "Fill in the blog tags!" };
  }
  if (!blogObj.banner) {
    return { error: "Please provide a banner for your blog!" };
  }

  try {
    const blog_author_id = new ObjectId(session._id);
    const blog_slug = slugify(blogObj.title);
    const lowercaseTags = blogObj.tags.map((tag: string) => tag.toLowerCase());
    const collection = await getCollection("blogs");
    const userCollection = await getCollection("users");

    if (slug) {
      const result = await collection.updateOne(
        { slug },
        {
          $set: {
            ...blogObj,
            tags: lowercaseTags,
            slug: blog_slug,
            author: blog_author_id,
          },
        }
      );

      if (result.matchedCount > 0) {
        await userCollection.updateOne(
          { _id: blog_author_id },
          { $addToSet: { blogs: blog_slug } }
        );
      }
      await fetch(`${DEFAULT_WEBSITE_URL}/api/revalidate`, {
        method: "GET",
      });
      return { success: `${blogObj.title} updated!` };
    } else {
      const newBlog = new Blog({
        ...blogObj,
        tags: lowercaseTags,
        slug: blog_slug,
        author: blog_author_id,
      });
      const insertResult = await collection.insertOne(newBlog);

      if (insertResult.insertedId) {
        await userCollection.updateOne(
          { _id: blog_author_id },
          { $addToSet: { blogs: blog_slug } }
        );
      }
      await fetch(`${DEFAULT_WEBSITE_URL}/api/revalidate`, {
        method: "GET",
      });
      return { success: `${blogObj.title} created!` };
    }
  } catch (error) {
    return { error: `Something went wrong!` };
  }
};

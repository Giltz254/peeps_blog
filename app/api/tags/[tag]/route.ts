import { Post_Per_Page } from "@/actions";
import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { tag } }: { params: { tag: string } }) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  try {
    const blogsCollection = await getCollection("blogs");

    const blogs = await blogsCollection
      .find({
        draft: false,
        tags: tag,
      })
      .sort({ createdAt: -1 })
      .skip(Post_Per_Page * (page - 1))
      .limit(Post_Per_Page)
      .project({
        title: 1,
        id: 1,
        des: 1,
        banner: 1,
        createdAt: 1,
        slug: 1,
        tags: 1,
        total_likes: 1,
        "author.name": 1,
        "author.image": 1,
      })
      .toArray();

    const totalCount = await blogsCollection.countDocuments({
      draft: false,
      tags: tag,
    });

    const response = {
      total: totalCount,
      blogs,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Something went wrong while fetching blogs: ${error}` },
      { status: 500 }
    );
  }
}

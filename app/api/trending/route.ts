import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const maxLimit = 5;

  try {
    const blogsCollection = await getCollection("blogs");
    const trendingBlogsPromise = blogsCollection
      .aggregate([
        { $match: { draft: false } },
        { $sort: { total_reads: -1, total_likes: -1, createdAt: -1 } },
        { $limit: maxLimit },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },
        {
          $project: {
            title: 1,
            des: 1,
            banner: 1,
            createdAt: 1,
            slug: 1,
            tags: 1,
            total_likes: 1,
            total_reads: 1,
            "authorDetails.name": 1,
            "authorDetails.image": 1,
          },
        },
      ])
      .toArray();

    const trendingBlogs = await trendingBlogsPromise;

    return NextResponse.json({ trending: trendingBlogs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Something went wrong while fetching trending blogs: ${error.message}` },
      { status: 500 }
    );
  }
}

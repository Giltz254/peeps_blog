import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Post_Per_Page } from "@/actions";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  try {
    const blogsCollection = await getCollection("blogs");
    const blogsPromise = blogsCollection
      .aggregate([
        { $match: { draft: false } },
        { $sort: { createdAt: -1 } },
        { $skip: Post_Per_Page * (page - 1) },
        { $limit: Post_Per_Page },
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
            "authorDetails.name": 1,
            "authorDetails.image": 1,
          },
        },
      ])
      .toArray();
    const totalCountPromise = blogsCollection.countDocuments({ draft: false });
    const [blogs, totalCount] = await Promise.all([
      blogsPromise,
      totalCountPromise,
    ]);
    const response = {
      total: totalCount,
      blogs: blogs,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Something went wrong while fetching blogs: ${error.message}` },
      { status: 500 }
    );
  }
}
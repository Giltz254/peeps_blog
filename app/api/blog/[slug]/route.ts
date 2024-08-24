import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const GET = async (
  req: Request,
  { params: { slug } }: { params: { slug: string } }
) => {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");

  try {
    const blogCollection = await getCollection("blogs");
    let singleblog;

    if (mode !== "edit") {
      singleblog = await blogCollection.findOneAndUpdate(
        { slug },
        { $inc: { total_reads: 1 } },
        {
          returnDocument: "after",
          projection: {
            slug: 1,
            title: 1,
            des: 1,
            banner: 1,
            total_comments: 1,
            total_likes: 1,
            total_parent_comments: 1,
            total_reads: 1,
            content: 1,
            createdAt: 1,
            tags: 1,
            author: 1,
          },
        }
      );
    } else {
      // Simply fetch the blog without updating total_reads in edit mode
      singleblog = await blogCollection.findOne(
        { slug },
        {
          projection: {
            slug: 1,
            title: 1,
            des: 1,
            banner: 1,
            total_comments: 1,
            total_likes: 1,
            total_parent_comments: 1,
            total_reads: 1,
            content: 1,
            createdAt: 1,
            tags: 1,
            author: 1,
          },
        }
      );
    }

    if (!singleblog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Fetch blog with author details using aggregation
    const blogWithAuthorDetails = await blogCollection.aggregate([
      { $match: { slug } },
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
          slug: 1,
          title: 1,
          des: 1,
          banner: 1,
          total_comments: 1,
          total_likes: 1,
          total_parent_comments: 1,
          total_reads: 1,
          content: 1,
          author: 1,
          createdAt: 1,
          tags: 1,
          "authorDetails.name": 1,
          "authorDetails.image": 1,
        },
      },
    ]).toArray();

    if (!blogWithAuthorDetails || blogWithAuthorDetails.length === 0) {
      return NextResponse.json(
        { error: "Blog not found after aggregation" },
        { status: 404 }
      );
    }

    // Handle similar blogs query using aggregation
    const tags = singleblog.tags || []; // Safe access to tags

    const similarBlogs = await blogCollection.aggregate([
      {
        $match: {
          slug: { $ne: slug },
          tags: { $in: tags },
        },
      },
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
          tags: 1,
          slug: 1,
          total_likes: 1,
          createdAt: 1,
          "authorDetails.name": 1,
          "authorDetails.image": 1,
        },
      },
      { $limit: 5 },
    ]).toArray();

    return NextResponse.json(
      { singleblog: blogWithAuthorDetails[0], similarBlogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong while fetching blog: ${error}` },
      { status: 500 }
    );
  }
};

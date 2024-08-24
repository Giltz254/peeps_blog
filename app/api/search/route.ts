import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const blogCollection = await getCollection("blogs");

    const searchPipeline = [
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query: query,
                  path: "title",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 1,
                    maxExpansions: 256,
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "content",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 1,
                    maxExpansions: 256,
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "des",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 1,
                    maxExpansions: 256,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 20,
      },
      {
        $project: {
          slug: 1,
          title: 1,
          banner: 1,
        },
      },
    ];

    const defaultPipeline = [
      {
        $sort: {
          total_reads: -1,
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          slug: 1,
          title: 1,
          _id: 0,
        },
      },
    ];

    const pipeline = query ? searchPipeline : defaultPipeline;
    const blogs = await blogCollection.aggregate(pipeline).toArray();

    return NextResponse.json(blogs, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Something went wrong while fetching blogs: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

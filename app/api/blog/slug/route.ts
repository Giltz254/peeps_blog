import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const blogsCollection = await getCollection("blogs");
    const slugs = await blogsCollection
      .find({ draft: false })
      .project({ slug: 1, _id: 0 })
      .toArray();
    return NextResponse.json(slugs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Something went wrong while fetching slugs: ${error.message}` },
      { status: 500 }
    );
  }
}

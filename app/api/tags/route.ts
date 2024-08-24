import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const blogsCollection = await getCollection("blogs");
    const uniqueTagsPromise = blogsCollection
      .aggregate([
        { $match: { draft: false, tags: { $exists: true, $ne: [] } } },
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
      ])
      .toArray();

    const uniqueTagsData = await uniqueTagsPromise;
    const uniqueTags = uniqueTagsData.map(tagData => ({
      tag: tagData._id,
      count: tagData.count,
    }));

    return NextResponse.json({ uniqueTags }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Something went wrong while fetching tags: ${error.message}` },
      { status: 500 }
    );
  }
}

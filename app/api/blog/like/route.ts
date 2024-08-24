import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const POST = async (req: Request) => {
  const body = await req.json();
  let { slug, isLikedByUser, postId } = body;
  let incrementValue = !isLikedByUser ? 1 : -1;
  const session = await currentUser();
  const userId = session?.id;

  if (!session || !userId) {
    return NextResponse.json(
      { error: "Please log in to like!" },
      { status: 400 }
    );
  }

  try {
    const blogCollection = await getCollection("blogs");
    const likeCollection = await getCollection("likes");
    const blog = await blogCollection.findOneAndUpdate(
      { slug },
      { $inc: { total_likes: incrementValue } },
      { returnDocument: "after" }
    );

    if (!isLikedByUser) {
      await likeCollection.insertOne({
        userId: userId,
        postId: postId,
      });
      return NextResponse.json({ liked_by_user: true }, { status: 200 });
    } else {
      await likeCollection.deleteOne({
        userId: userId,
        postId: postId,
      });
      return NextResponse.json({ liked_by_user: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");
  const session = await currentUser();
  const userId = session?.id;

  if (!session || !userId || !postId) {
    return NextResponse.json(
      { error: "Please log in to check like status!" },
      { status: 400 }
    );
  }

  try {
    const likeCollection = await getCollection("likes");
    const like = await likeCollection.findOne({
      userId: userId,
      postId: postId,
    });

    const isLikedByUser = !!like;
    return NextResponse.json({ isLikedByUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};

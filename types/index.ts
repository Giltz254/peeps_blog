import { ObjectId } from 'mongodb';
import { Session as AuthSession } from '@auth/core/types';
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  WRITER = "WRITER",
}
export type AuthorDetails = {
  name: string;
  image: string;
};

export type Blog = {
  _id: string;
  slug: string;
  title: string;
  banner: string;
  des: string;
  tags: string[];
  total_likes: number;
  createdAt: Date;
  authorDetails: AuthorDetails;
  content?: any[];
  updatedAt?: Date;
};

export type Trending = Blog & {
  total_reads: number;
};

export type UniqueTag = {
  tag: string;
  count: number;
};

export type Post = {
  total: number;
  blogs: Blog[];
  trending: Trending[];
  uniqueTags: UniqueTag[];
};
export interface SessionProps {
  session: AuthSession | null;
}
export interface IUser {
  username: string;
  avatar?: string;
}

export interface IComment {
  user: IUser;
  _id: string;
  post_Id: string;
  text: string;
  score: number;
  replies: IComment[]; // Recursive structure for nested replies
  parentComment: string | null;
  upvotedBy: string[];
  date: string;
  updatedAt: string;
}

import { DefaultSession } from "next-auth";
import { UserRole } from "./types/index";
import { ObjectId } from "mongodb";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
    _id: ObjectId;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { UserRole } from "@/types/index";
import clientPromise from "./lib/db";
import { ObjectId } from 'mongodb';
import { getCollection } from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { LoginSchema } from "./schemas"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/sign-in",
        error: "/error"
    },
    events: {
        async linkAccount({ user, account }) {
            const collection = await getCollection("users");
            await collection.updateOne(
                { _id: new ObjectId(user.id) },
                { $set: { emailVerified: new Date(), role: "USER", providerAccountId: account.providerAccountId } }
            );
        }
    },    
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }
            const collection = await getCollection("users");
            const existingUser = await collection.findOne({
                email: user.email
            })
            if (!existingUser|| !existingUser.emailVerified) {
                return false;
            }
            return true;
        },
        async session({ session, token }){
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role  as UserRole
            }
            if (token._id && session.user) {
                session.user._id = token._id as ObjectId
            }
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.image = token.picture;
            }
            console.log(session)
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }
            const collection = await getCollection("users");
            const existingUser = await collection.findOne(
                { email: token.email }
            );
            if (!existingUser) {
                return token
            }
            token.name = existingUser.name
            token.email = existingUser.email
            token.picture = existingUser.image
            token.role = existingUser.role;
            token._id = existingUser._id
            return token;
        }
    },
  session: {
    strategy: 'jwt'
},
providers: [GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
}), GithubProvider({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
}), CredentialsProvider({
    async authorize (credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
            const {email, password} = validatedFields.data;
            const collection = await getCollection("users");
            const user = await collection.findOne({ email });
            if (!user || !user.password) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                return {
                    ...user,
                    id: user._id.toString(),
                  } as User
            }
        }
        return null
    }
})]
})
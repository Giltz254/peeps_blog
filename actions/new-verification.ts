"use server"
import { getCollection } from "@/lib/mongodb"
import { getUserByEmail } from "@/queries/user"
import { getVerificationTokenByToken } from "@/queries/verification-token"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)
    if (!existingToken) {
        return {error: "Invalid token!"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return {error: "Token has expired!"}
    }
    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return {error: "Email does not exist!"}
    }
   try {
    const collection = await getCollection("users");
    const verificationTokensCollection = await getCollection("verificationTokens");
    await collection.updateOne(
        { _id: existingUser._id },
        { $set: { emailVerified: new Date(), email: existingToken.email } }
    )
    await verificationTokensCollection.deleteOne(
        { _id: existingToken._id }
    );
    return {success: "Email verified!"}
   } catch (error) {
    
   }
}
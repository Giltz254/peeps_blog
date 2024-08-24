import { getCollection } from "@/lib/mongodb";
export const getUserByEmail = async (email: string) => {
  try {
    const collection = await getCollection("users");
    const existingUser = await collection.findOne({ email });
    return existingUser;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const collection = await getCollection("users");
    const existingUserbyid = await collection.findOne({ id });
    return existingUserbyid;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
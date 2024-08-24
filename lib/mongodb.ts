import clientPromise from "@/lib/db";

export async function getDatabase() {
    const client = await clientPromise;
    return client.db('blog');
  }
  
  export async function getCollection(collectionName: string) {
    const db = await getDatabase();
    return db.collection(collectionName);
  }
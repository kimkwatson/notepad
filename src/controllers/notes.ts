import { Db } from "mongodb";

interface Note {
  title: string;
  content: string;
}

export async function getAllNotes(db: Db) {
  try {
    const notes = await db.collection("notepad").find({}).toArray();
    return notes;
  } catch (error) {
    console.error("Error retrieving notes:", error);
    throw error;
  }
}

function getAllNotes(req, res) {
  res.json([]);
}
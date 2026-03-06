import { Request, Response } from "express";
import { getDb } from "../db/connect.js";

interface Note {
  title: string;
  content: string;
  date: string;
}

export async function getAllNotes(req: Request, res: Response): Promise<void> {
  try {
    const db = getDb();
    const notes = await db.collection<Note>("notepad").find({}).toArray();
    res.json(notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
}
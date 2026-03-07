import { Request, Response } from "express";
import {ObjectId } from "mongodb";
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
    res.status(500).json({ error: "Failed to retrieve notes." });
  }
}

export async function getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid note id format." });
            return;
        }

        const note = await getDb()
            .collection("notepad")
            .findOne({ _id: new ObjectId(id) });

        if (!note) {
            res.status(404).json({ message: "Note not found." });
            return;
        }

        res.status(200).json(note);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while retrieving the note." });
    }
};
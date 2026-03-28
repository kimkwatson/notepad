import { Request, Response } from "express";
import {ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

interface Note {
  title: string;
  content: string;
  date: string;
}

// function to get all notes from the database
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

// function to get one note from the database by ID
export async function getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid note id format." });
            return;
        }

        const note = await getDb()
            .collection<Note>("notepad")
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

// function to create a new note
export async function createNote(req: Request, res: Response): Promise<void> {
  try {
    const {title, content, date } = req.body;

    if (!title || !content || !date) {
      res.status(400).json({ message: "Title, content, and date are required." });
      return;
    }

    const newNote: Note = {
      title,
      content,
      date
    };

    const db = getDb();
    const result = await db.collection<Note>("notepad").insertOne(newNote);

    res.status(201).json({
      message: "Note created successfully.",
      id: result.insertedId
    });
  } catch (error) {

  }
}
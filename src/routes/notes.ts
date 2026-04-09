import { Router } from "express";
import { getAllNotes, getNoteById, createNote, editNote, deleteNote } from "../controllers/notes.js";

const router = Router();

// get all notes
router.get("/", getAllNotes);

// get note by id
router.get("/:id", getNoteById);

// create new note
router.post("/", createNote);

// edit note by id
router.put("/:id", editNote);

// delete note by id
router.delete("/:id", deleteNote);

export default router;
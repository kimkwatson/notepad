import { Router } from "express";
import { getAllNotes, getNoteById } from "../controllers/notes.js";
const router = Router();

// get all notes
router.get("/", getAllNotes);

// get note by id
router.get("/:id", getNoteById);

// create new note
router.post("/", createNewNote);

// edit note by id
router.put("/:id", editNoteById);

// delete note by id
router.delete("/:id", deleteNoteById);

export default router;
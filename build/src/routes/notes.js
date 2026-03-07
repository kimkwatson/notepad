"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_js_1 = require("../controllers/notes.js");
const router = (0, express_1.Router)();
// get all notes
router.get("/", notes_js_1.getAllNotes);
// get note by id
router.get("/:id", notes_js_1.getNoteById);
// create new note
//router.post("/", createNewNote);
// edit note by id
//router.put("/:id", editNoteById);
// delete note by id
//router.delete("/:id", deleteNoteById);
exports.default = router;

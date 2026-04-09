"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = getAllNotes;
exports.getNoteById = getNoteById;
exports.createNote = createNote;
exports.editNote = editNote;
const mongodb_1 = require("mongodb");
const connect_js_1 = require("../db/connect.js");
const NoteItem_js_1 = require("../models/NoteItem.js");
// function to get all notes from the database
async function getAllNotes(req, res) {
    try {
        const db = (0, connect_js_1.getDb)();
        const notes = await db.collection("notepad").find({}).toArray();
        res.json(notes);
    }
    catch (error) {
        console.error("Error retrieving notes:", error);
        res.status(500).json({ error: "Failed to retrieve notes." });
    }
}
// function to get one note from the database by ID
async function getNoteById(req, res) {
    try {
        const id = req.params.id;
        if (!mongodb_1.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid note id format." });
            return;
        }
        const note = await (0, connect_js_1.getDb)()
            .collection("notepad")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!note) {
            res.status(404).json({ message: "Note not found." });
            return;
        }
        res.status(200).json(note);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while retrieving the note." });
    }
}
;
// function to create a new note
async function createNote(req, res) {
    try {
        const { title, content, date } = req.body;
        if (!title || !content || !date) {
            res.status(400).json({ message: "Title, content, and date are required." });
            return;
        }
        const newNote = new NoteItem_js_1.NoteItem(title, content, date);
        const db = (0, connect_js_1.getDb)();
        const result = await db.collection("notepad").insertOne(newNote);
        res.status(201).json({
            message: "Note created successfully.",
            id: result.insertedId
        });
    }
    catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Failed to create note." });
    }
}
// function to edit a note
async function editNote(req, res) {
    try {
        const id = req.params.id;
        if (!mongodb_1.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid note id format." });
            return;
        }
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required." });
            return;
        }
        const db = (0, connect_js_1.getDb)();
        const result = await db.collection("notepad").updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                title,
                content,
                date: new Date().toISOString()
            }
        });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: "Note not found." });
            return;
        }
        res.status(200).json({ message: "Note updated successfully." });
    }
    catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Failed to update note." });
    }
}

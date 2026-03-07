"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = getAllNotes;
exports.getNoteById = getNoteById;
const mongodb_1 = require("mongodb");
const connect_js_1 = require("../db/connect.js");
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

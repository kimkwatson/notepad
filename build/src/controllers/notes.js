"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = getAllNotes;
const connect_js_1 = require("../db/connect.js");
async function getAllNotes(req, res) {
    try {
        const db = (0, connect_js_1.getDb)();
        const notes = await db.collection("notepad").find({}).toArray();
        res.json(notes);
    }
    catch (error) {
        console.error("Error retrieving notes:", error);
        res.status(500).json({ error: "Failed to retrieve notes" });
    }
}

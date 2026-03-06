"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = getAllNotes;
async function getAllNotes(db) {
    try {
        const notes = await db.collection("notepad").find({}).toArray();
        return notes;
    }
    catch (error) {
        console.error("Error retrieving notes:", error);
        throw error;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteItem = void 0;
class NoteItem {
    title;
    content;
    date;
    constructor(title, content, date) {
        this.title = title;
        this.content = content;
        this.date = date;
    }
    getPreview() {
        return this.content.length > 40
            ? this.content.slice(0, 40) + "..."
            : this.content;
    }
}
exports.NoteItem = NoteItem;

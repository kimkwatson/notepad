export class NoteItem {
    title: string;
    content: string;
    date: string;

    constructor(title: string, content: string, date: string) {
        this.title = title;
        this.content = content;
        this.date = date;
    }

    getPreview(): string {
        return this.content.length > 40
            ? this.content.slice(0, 40) + "..."
            : this.content;
    }
}
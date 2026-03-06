function renderNoteList(notes) {
  const noteList = document.querySelector("#note-list");

  if (!noteList) {
    console.error("Could not find #note-list");
    return;
  }

  // clear old notes (optional but usually helpful)
  noteList.innerHTML = "";

  // sort notes by date (newest first)
  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  notes.forEach((note) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.textContent = note.title;
    link.href = "#";
    link.dataset.id = note._id; // works even if _id is a string

    const dateSpan = document.createElement("span");
    dateSpan.textContent = ` ${new Date(note.date).toLocaleDateString()}`;

    li.appendChild(link);
    li.appendChild(dateSpan);
    noteList.appendChild(li);
  });
}

async function loadNotes() {
  try {
    const response = await fetch("/notes");
    const notes = await response.json();
    renderNoteList(notes);
  } catch (error) {
    console.error("Error loading notes:", error);
  }
}

loadNotes();
let currentNoteId: string | null = null;

interface Note {
  _id: string;
  title: string;
  content: string;
  date: string;
}

/*** Render list of notes in left panel ***/
function renderNoteList(notes: Note[]) {
  const noteList = document.querySelector("#note-list");

  if (!noteList) {
    console.error("Could not find #note-list");
    return;
  }

  // empty list
  noteList.innerHTML = "";

  // sort notes by date
  notes.sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // create a list item for each note
  notes.forEach((note: Note) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.textContent = note.title;
    link.href = "#";

    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = link.dataset.id;
      if (id) {
        loadNoteById(id);
      }
    });
    link.dataset.id = note._id;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = ` ${new Date(note.date).toLocaleDateString()}`;

    // add link and date to list item
    li.appendChild(link);
    li.appendChild(dateSpan);

    // add list item to note list
    noteList.appendChild(li);
  });
}

/*** Display selected note in right panel ***/
function renderCurrentNote(note: Note) {
  const noteCard = document.getElementById("note-card");

  if (!noteCard) {
    console.error("Could not find #note-card");
    return;
  }

  noteCard.innerHTML = `
    <h2></h2>
    <p></p>
  `;

  const title = noteCard.querySelector("h2");
  const content = noteCard.querySelector("p");

  if (!title || !content) {
    console.error("Could not create note display elements");
    return;
  }

  title.textContent = note.title;
  content.textContent = note.content;

  currentNoteId = note._id;
}

/*** Display current note when clicked from left panel list */
async function handleNoteClick(event: Event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;

  const link = target.closest("a");
  if (!link) return;

  event.preventDefault();

  const id = link.dataset.id;
  if (!id) return;

  try {
    const response = await fetch(`/notes/${id}`);
    const note = await response.json();
    renderCurrentNote(note);
  } catch (error) {
    console.error("Error loading note:", error);
  }
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

async function loadNoteById(id: string) {
  try {
    const response = await fetch(`/notes/${id}`);
    const note = await response.json();
    renderCurrentNote(note);
  } catch (error) {
    console.error("Error loading note:", error);
  }
}

/*** Create New Note */
const createBtn = document.getElementById("new-btn");

createBtn?.addEventListener("click", () => {
  const noteCard = document.getElementById("note-card");
  if (!noteCard) return;

  currentNoteId = null;

  noteCard.innerHTML = `
    <h2>New Note</h2>
    <div id="new-note">
    <input id="new-title" placeholder="Title"/>
    <textarea id="new-content" placeholder="Content"></textarea>
    <button id="save-new-btn">Create Note</button>
    </div>
  `;

  const createSaveBtn = document.getElementById("save-new-btn");

  createSaveBtn?.addEventListener("click", async () => {
    const titleInput = document.getElementById("new-title") as HTMLInputElement | null;
    const contentInput = document.getElementById("new-content") as HTMLTextAreaElement | null;

    const title = titleInput?.value.trim();
    const content = contentInput?.value.trim();

    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    try {
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          date: new Date().toISOString()
        })
      });

      console.log("POST response status:", response.status);
      const result = await response.json();

      await loadNotes();

      if (result.id) {
        await loadNoteById(result.id);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  });
});

/*** Edit Note */
const editBtn = document.getElementById("edit-btn");

editBtn?.addEventListener("click", () => {
  const title = document.querySelector("#note-card h2");
  const content = document.querySelector("#note-card p");

  if (!title || !content) return;

  const currentTitle = title.textContent;
  const currentContent = content.textContent;

  const noteCard = document.getElementById("note-card");

  if (!noteCard) return;

  noteCard.innerHTML = `
  <h2>Edit Note</h2>  
  <div id="edit-note">
    <input id="edit-title" value="${currentTitle}" />
    <textarea id="edit-content">${currentContent}</textarea>
    <button id="save-edit-btn">Save Changes</button>
    </div>
  `;

  const saveBtn = document.getElementById("save-edit-btn");

  saveBtn?.addEventListener("click", async () => {
    const editTitleInput = document.getElementById("edit-title") as HTMLInputElement | null;
    const editContentInput = document.getElementById("edit-content") as HTMLTextAreaElement | null;

    if(!editTitleInput || !editContentInput) return;

    const newTitle = editTitleInput.value;
    const newContent = editContentInput.value;

    try {
      await fetch(`/notes/${currentNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent
        })
      });

      await loadNotes();
      if (currentNoteId) {
        loadNoteById(currentNoteId);
      }

    } catch (error) {
      console.error("Error updating note:", error);
    }
  })
});

const noteList = document.querySelector("#note-list");
noteList?.addEventListener("click", handleNoteClick);

loadNotes();


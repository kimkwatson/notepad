let currentNoteId = null;

/*** Render list of notes in left panel ***/
function renderNoteList(notes) {
  const noteList = document.querySelector("#note-list");

  if (!noteList) {
    console.error("Could not find #note-list");
    return;
  }

  // empty list
  noteList.innerHTML = "";

  // sort notes by date
  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // create a list item for each note
  notes.forEach((note) => {
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
function renderCurrentNote(note) {
  const title = document.querySelector("#note-card h2");
  const content = document.querySelector("#note-card p");

  if (!title || !content) {
    console.error("Could not find #note-card elements");
    return;
  }

  title.textContent = note.title;
  content.textContent = note.content;

  // store current note id globally
  currentNoteId = note._id;
}

/*** Display current note when clicked from left panel list */
async function handleNoteClick(event) {
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

async function loadNoteById(id) {
  try {
    const response = await fetch(`/notes/${id}`);
    const note = await response.json();
    renderCurrentNote(note);
  } catch (error) {
    console.error("Error loading note:", error);
  }
}

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
    <input id="edit-title" value="${currentTitle}" />
    <textarea id="edit-content">${currentContent}</textarea>
    <button id="save-btn">Save</button>
  `;

  const saveBtn = document.getElementById("save-btn");

  saveBtn?.addEventListener("click", async () => {
    const newTitle = document.getElementById("edit-title").value;
    const newContent = document.getElementById("edit-content").value;

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

      loadNotes();
      loadNoteById(currentNoteId);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  })
});

const noteList = document.querySelector("#note-list");
noteList?.addEventListener("click", handleNoteClick);

loadNotes();


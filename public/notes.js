/*** Render list of notes in left panel ***/
function renderNoteList(notes) {
  const noteList = document.querySelector("#note-list");

  if (!noteList) {
    console.error("Could not find #note-list");
    return;
  }

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
  const title = document.querySelector("#note-current h2");
  const content = document.querySelector("#note-current p");

  if (!title || !content) {
    console.error("Could not find #note-current");
    return;
  }

  title.textContent = note.title;
  content.textContent = note.content;
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

const noteList = document.querySelector("#note-list");
noteList?.addEventListener("click", handleNoteClick);

loadNotes();


// Define variables for note form and note list elements
const noteForm = document.querySelector('#note-form');
const noteList = document.querySelector('#note-list');

// Add event listener to note form
noteForm.addEventListener('submit', saveNote);

// Function to save note to local storage
function saveNote(event) {
  event.preventDefault();

  // Get note title and body
  const noteTitle = document.querySelector('#note-title').value;
  const noteBody = document.querySelector('#note-body').value;

  // Create note object
  const note = {
    title: noteTitle,
    body: noteBody,
  };

  // Check if there are any existing notes in local storage
  let notes = JSON.parse(localStorage.getItem('notes'));

  // If there are no existing notes, create a new array
  if (!Array.isArray(notes)) {
    notes = [];
  }

  // Add the new note to the notes array
  notes.push(note);

  // Save the updated notes array to local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Reset the note form
  noteForm.reset();

  // Refresh the note list
  showNotes();
}

// Function to display notes from local storage
function showNotes() {
  // Get notes from local storage
  let notes = JSON.parse(localStorage.getItem('notes'));

  // If there are no notes, set the notes array to an empty array
  if (!Array.isArray(notes)) {
    notes = [];
  }

  // Clear the note list
  noteList.innerHTML = '';

  // Loop through notes and add them to the note list
  notes.forEach((note, index) => {
    const noteItem = `
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.body}</p>
          <button type="button" class="btn btn-danger" onclick="deleteNote(${index})">Delete</button>
        </div>
      </div>
    `;
    noteList.innerHTML += noteItem;
  });
}

// Function to delete note from local storage
function deleteNote(index) {
  // Get notes from local storage
  let notes = JSON.parse(localStorage.getItem('notes'));

  // Remove note at specified index from notes array
  notes.splice(index, 1);

  // Save updated notes array to local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Refresh the note list
  showNotes();
}

// Call showNotes function to display any existing notes
showNotes();

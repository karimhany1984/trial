// app.js

// Ensuring that the application handles file uploads with drag-and-drop support
const dropArea = document.getElementById('drop-area');

// Prevent default behavior (Prevent file from being opened)
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
});

// Handle dropped files

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFiles(files);
});

const handleFiles = (files) => {
    // Process the uploaded files
    console.log(files);
};

// State management using JavaScript objects
const appState = {
    score: 0,
    notes: [],
};

// Form handling to add notes
const form = document.getElementById('note-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const noteInput = document.getElementById('note-input');
    addNote(noteInput.value);
    noteInput.value = '';
});

const addNote = (note) => {
    appState.notes.push(note);
    updateLocalStorage();
    renderNotes();
};

const renderNotes = () => {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    appState.notes.forEach((note) => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });
};

const updateLocalStorage = () => {
    localStorage.setItem('appState', JSON.stringify(appState));
};

// Initialize app from local storage
const initApp = () => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
        Object.assign(appState, JSON.parse(storedState));
        renderNotes();
    }
};

initApp();

// Accessibility focus management
const noteInput = document.getElementById('note-input');
noteInput.addEventListener('focus', () => {
    noteInput.placeholder = "Enter your note here...";
});

// Error handling example
const riskyFunction = () => {
    try {
        // Some code that may throw an error
        throw new Error('An error occurred!');
    } catch (error) {
        console.error(error.message);
    }
};

// Call risky function to demonstrate error handling
riskyFunction();

// Scoring system
const updateScore = (points) => {
    appState.score += points;
    console.log('Current score:', appState.score);
};

// Example call to update score
updateScore(10);
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import Fab from "./components/Fab";

// Sample folders/tags for demonstration (could be dynamic)
const DEFAULT_FOLDERS = [
  { name: "All Notes" },
  { name: "Personal" },
  { name: "Work" },
  { name: "Ideas" }
];

// Local storage key for browser demo
const LS_KEY = "noteease_notes";

// Returns a new unique id (for demo, could be replaced with backend id)
function uuid() {
  return (
    Math.random().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 4)
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application for NoteEase - a minimal notes manager with CRUD/search.
   * Reads/writes all data to localStorage for demo/self-contained testing.
   * UI/UX: Light theme, minimal, modern, with header, sidebar, list, FAB.
   */
  // THEME STATE (light only, for customizability)
  const [theme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // NOTES AND UI STATE
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [activeFolder, setActiveFolder] = useState(DEFAULT_FOLDERS[0].name);
  const [searchQuery, setSearchQuery] = useState("");

  // LOAD data from localStorage or fallback to sample demo notes
  useEffect(() => {
    const data = window.localStorage.getItem(LS_KEY);
    if (data) setNotes(JSON.parse(data));
    else
      setNotes([
        {
          id: uuid(),
          folder: "Work",
          title: "Welcome to NoteEase!",
          content: "This is a quick minimal demo note. Click + to start.",
          updatedAt: new Date().toISOString(),
        }
      ]);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(notes));
  }, [notes]);

  // CRUD HANDLERS
  function handleNoteCreate() {
    setEditingNote(null);
    setEditorOpen(true);
  }
  function handleNoteEdit(note) {
    setEditingNote(note);
    setEditorOpen(true);
  }
  function handleNoteSave(note) {
    if (!note.title && !note.content) {
      setEditorOpen(false);
      setEditingNote(null);
      return;
    }
    if (note.id) {
      setNotes(n =>
        n.map((x) =>
          x.id === note.id ? { ...note, updatedAt: new Date().toISOString() } : x
        )
      );
    } else {
      setNotes(n =>
        [
          {
            ...note,
            id: uuid(),
            updatedAt: new Date().toISOString()
          },
          ...n,
        ]);
    }
    setEditorOpen(false);
    setEditingNote(null);
  }
  function handleNoteDelete(id) {
    setNotes(n => n.filter(note => note.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  }

  // FILTER by folder, search
  let filteredNotes = notes;
  if (activeFolder && activeFolder !== "All Notes") {
    filteredNotes = filteredNotes.filter((n) => n.folder === activeFolder);
  }
  if (searchQuery) {
    const lower = searchQuery.toLowerCase();
    filteredNotes = filteredNotes.filter(
      (n) =>
        (n.title && n.title.toLowerCase().includes(lower)) ||
        (n.content && n.content.toLowerCase().includes(lower))
    );
  }

  // Get currently selected note for editing/view
  const selectedNote = notes.find(n => n.id === selectedNoteId);

  // All folders = demo sample + discovered from notes
  const folders = [
    ...DEFAULT_FOLDERS.slice(0, 1),
    ...Array.from(
      new Set(
        [
          ...notes.map(n => n.folder),
          ...DEFAULT_FOLDERS.slice(1).map(f => f.name),
        ].filter(Boolean)
      )
    ).map(name => ({ name })),
  ];

  return (
    <div className="app-shell">
      <Header />
      <div className="main-layout">
        <Sidebar
          folders={folders}
          activeFolder={activeFolder}
          onFolderSelect={name => { setActiveFolder(name); setSelectedNoteId(null); }}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="main-content">
          <NotesList
            notes={filteredNotes}
            selectedNoteId={selectedNoteId}
            onNoteSelect={id => { setSelectedNoteId(id); handleNoteEdit(notes.find(n => n.id === id)); }}
            onDelete={handleNoteDelete}
            searchQuery={searchQuery}
          />
        </div>
        <Fab onClick={handleNoteCreate} />
        <NoteEditor
          open={editorOpen}
          note={editingNote}
          onSave={handleNoteSave}
          onClose={() => { setEditorOpen(false); setEditingNote(null); }}
          folderOptions={folders.map(f => f.name)}
        />
      </div>
    </div>
  );
}

export default App;

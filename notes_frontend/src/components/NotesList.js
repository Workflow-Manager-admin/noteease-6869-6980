import React from "react";

// PUBLIC_INTERFACE
function NotesList({
  notes,
  onNoteSelect,
  selectedNoteId,
  onDelete,
  searchQuery
}) {
  /**
   * Main notes listing.
   * @param notes - array of notes: {id, title, content, folder, updatedAt}
   * @param onNoteSelect - function(id)
   * @param selectedNoteId - number|string
   * @param onDelete - function(id)
   */
  return (
    <main className="notes-list">
      {notes.length === 0 ? (
        <div className="empty-message">
          {searchQuery
            ? "No matching notes."
            : "No notes in this folder. Click + to add!"}
        </div>
      ) : (
        <ul>
          {notes.map(note => (
            <li
              key={note.id}
              className={note.id === selectedNoteId ? "note-item selected" : "note-item"}
              onClick={() => onNoteSelect(note.id)}
              tabIndex={0}
              onKeyPress={e => e.key === "Enter" && onNoteSelect(note.id)}
            >
              <div className="note-title-row">
                <span className="note-title">{note.title || "(No title)"}</span>
                <button className="delete-btn"
                  aria-label="Delete note"
                  onClick={e => { e.stopPropagation(); onDelete(note.id); }}>
                  🗑️
                </button>
              </div>
              <div className="note-snippet">
                {note.content ? note.content.slice(0,60) : ""}
              </div>
              <div className="note-updated">{note.updatedAt?.slice(0,10)}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default NotesList;

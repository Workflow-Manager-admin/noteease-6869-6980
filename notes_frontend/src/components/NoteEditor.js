import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function NoteEditor({ open, note, onSave, onClose, folderOptions }) {
  /**
   * Modal editor for editing note fields.
   * @param open - boolean
   * @param note - {id, title, content, folder} | null for new
   * @param onSave - function(note) (note.id==null for create)
   * @param onClose - function()
   * @param folderOptions - [folderName...]
   */
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [folder, setFolder] = useState(note?.folder || (folderOptions?.[0] || ""));

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setFolder(note?.folder || (folderOptions?.[0] || ""));
  }, [note, folderOptions]);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "" && content.trim() === "") {
      return; // Do not allow empty note
    }
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
      folder: folder || "",
    });
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <form className="editor-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Title"
            />
          </label>
          <label>
            Content
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={7}
              maxLength={4000}
              placeholder="Type your note..."
            />
          </label>
          <label>
            Folder
            <select
              value={folder}
              onChange={e => setFolder(e.target.value)}
            >
              {folderOptions.map(name =>
                <option key={name} value={name}>{name}</option>
              )}
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {note?.id == null ? "Create" : "Save"}
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteEditor;

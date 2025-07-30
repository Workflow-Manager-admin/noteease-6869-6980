import React from "react";

// PUBLIC_INTERFACE
function Sidebar({
  folders,
  activeFolder,
  onFolderSelect,
  onSearch,
  searchQuery,
}) {
  /**
   * Sidebar for folders/tags and search bar.
   * @param folders - array of folder objects ({ name })
   * @param activeFolder - string
   * @param onFolderSelect - function
   * @param onSearch - function (event)
   * @param searchQuery - string
   */
  return (
    <aside className="sidebar">
      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
        aria-label="Search notes"
      />
      <nav className="folders-list">
        <span className="folders-header">Folders</span>
        <ul>
          {folders.map((folder) => (
            <li
              key={folder.name}
              className={activeFolder === folder.name ? "active" : ""}
              role="button"
              tabIndex={0}
              onClick={() => onFolderSelect(folder.name)}
              onKeyPress={e => e.key === "Enter" && onFolderSelect(folder.name)}
            >
              <span role="img" aria-label="folder">📁</span>
              {folder.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

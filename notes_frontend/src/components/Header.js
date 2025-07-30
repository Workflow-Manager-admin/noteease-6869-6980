import React from "react";

// PUBLIC_INTERFACE
function Header() {
  /** 
   * App header with title (brand) and minimalistic style.
   */
  return (
    <header className="header">
      <span className="header-title">
        <span role="img" aria-label="note" style={{fontSize: "1.2em"}}>📝</span>
        &nbsp;NoteEase
      </span>
    </header>
  );
}

export default Header;

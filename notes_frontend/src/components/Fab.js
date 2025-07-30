import React from "react";

// PUBLIC_INTERFACE
function Fab({ onClick }) {
  /** Floating action button (FAB) for add. */
  return (
    <button className="fab" aria-label="Add note" onClick={onClick}>
      +
    </button>
  );
}

export default Fab;

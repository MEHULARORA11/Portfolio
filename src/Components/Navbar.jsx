import React from "react";

function Navbar({ logoRef, theme }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 flex items-center px-6 py-4">
      <div
        ref={logoRef}
        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
        style={{ background: "var(--accent)", color: "var(--text-primary)" }}
      >
        MA
      </div>
    </nav>
  );
}

export default Navbar;

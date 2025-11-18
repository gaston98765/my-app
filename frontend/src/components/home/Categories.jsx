import React from "react";

function Categories() {
  return (
    <section className="dark-section">
      <div className="dark-inner">
        <h2 className="center">Popular task categories</h2>
        <p className="center sub">
          Whatever you need, there&apos;s probably a student nearby who can help.
        </p>
        <div className="task-grid">
          <button className="task-pill">Room cleaning</button>
          <button className="task-pill">Moving &amp; lifting</button>
          <button className="task-pill">Tutoring</button>
          <button className="task-pill">Groceries &amp; errands</button>
          <button className="task-pill">Tech support</button>
          <button className="task-pill">Event setup</button>
          <button className="task-pill">Pet sitting</button>
          <button className="task-pill">Document organization</button>
        </div>
      </div>
    </section>
  );
}

export default Categories;
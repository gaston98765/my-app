import React from "react";

const categories = [
  { title: "Social Media Manager" },
  { title: "hardware dev" },
  { title: "Software dev" }
];

export default function TaskCategories() {
  return (
    <section className="categories">
      <h2>Explore Tasks</h2>

      <div className="category-grid">
        {categories.map((c, i) => (
          <div className="category-card" key={i}>
            <div className="icon"></div>
            <h3>{c.title}</h3>
            <button className="btn-primary">Post Task</button>
          </div>
        ))}
      </div>
    </section>
  );
}

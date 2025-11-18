import React from "react";

function StudentsStrip() {
  return (
    <section className="students">
      <h2>Meet some Vit&apos;fait taskers</h2>
      <p>Verified students with profiles, skills, and CVs you can trust.</p>

      <div className="student-row">
        <div className="student-card">
          <div className="avatar red" />
          <h3>Ahmed</h3>
          <p className="student-role">Computer Science student</p>
          <p className="student-meta">Tech support • App installation • Laptop cleanup</p>
        </div>
        <div className="student-card">
          <div className="avatar purple" />
          <h3>Sara</h3>
          <p className="student-role">Business &amp; Management</p>
          <p className="student-meta">Organization • Note-taking • Presentation prep</p>
        </div>
        <div className="student-card">
          <div className="avatar blue" />
          <h3>Yassine</h3>
          <p className="student-role">Engineering</p>
          <p className="student-meta">Moving help • Repairs • Furniture assembly</p>
        </div>
      </div>
    </section>
  );
}
export default  StudentsStrip;
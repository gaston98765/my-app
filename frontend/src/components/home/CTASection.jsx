import React from "react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="cta-section">
      <p className="quote">
        &quot;Vit&apos;fait helped me pay my rent by doing small jobs between classes.&quot;
      </p>
      <p className="quote-author">– Ines, 2nd year student</p>
      <div className="cta-buttons">
        <Link to="/signup" className="primary-btn">
          Join as tasker
        </Link>
        <Link to="/signup" className="secondary-btn">
          Post a task
        </Link>
      </div>
    </section>
  );
}
export default CTASection;
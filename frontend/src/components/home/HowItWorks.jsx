import React from "react";

function HowItWorks() {
  return (
    <section className="dark-section">
      <div className="dark-inner">
        <div className="steps-header">
          <h2>How Vit&apos;fait works</h2>
          <p>Three simple steps to connect students who need help with students who want flexible work.</p>
        </div>
        <div className="steps-row">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Post your task</h3>
            <p>Describe your task, choose a time, and set a starting price.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Students bid</h3>
            <p>Verified students send offers. Compare prices, ratings, and profiles.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Choose &amp; pay safely</h3>
            <p>Pick the best offer, chat, and pay securely through Vit&apos;fait.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
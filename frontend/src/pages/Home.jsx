import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import StatsStrip from "../components/home/StatsStrip";
import Categories from "../components/home/Categories";
import StudentsStrip from "../components/home/StudentsStrip";
import CTASection from "../components/home/CTASection";

function Home() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <Categories />
        <StudentsStrip />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
export default Home;
import { motion } from "motion/react";
import BrandMark from "./BrandMark";

const WelcomeHero = () => (
  <motion.section
    animate={{ opacity: 1, y: 0 }}
    className="welcome-hero"
    initial={{ opacity: 0, y: 12 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="hero-logo">
      <BrandMark />
    </div>
    <p className="hero-eyebrow">Your creative workspace</p>
    <h1>
      Good to see you!
      <span>How can I assist you?</span>
    </h1>
    <p className="hero-description">
      Quickly find answers, get assistance, and explore AI-
      <br className="desktop-break" /> powered insights—all in one place
    </p>
  </motion.section>
);

export default WelcomeHero;

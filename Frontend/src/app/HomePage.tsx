import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

function Divider() {
  return (
    <div className="flex items-center justify-center px-6 lg:px-8">
      <div
        className="w-full max-w-7xl h-px"
        style={{
          background: "linear-gradient(to right, transparent, #E5E7EB 30%, #E5E7EB 70%, transparent)",
        }}
      />
    </div>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <Divider />
      <ProblemSection />
      <Divider />
      <FeaturesSection />
      <Divider />
      <HowItWorks />
      <Divider />
      <Testimonials />
      <Divider />
      <AboutSection />
      <Footer />
    </div>
  );
}

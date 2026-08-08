import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import Features from "../../components/landing/Features";
import ClassSelector from "../../components/landing/ClassSelector";
import DemoGames from "../../components/landing/DemoGames";
import Testimonials from "../../components/landing/Testimonials";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/common/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>

        <HeroSection />

        <Features />

        <ClassSelector />

        <DemoGames />

        <Testimonials />

        <CTASection />

      </main>

      <Footer />
    </>
  );
}
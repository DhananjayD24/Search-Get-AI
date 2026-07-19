import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import BackendWarmup from "@/components/common/BackendWarmup";

export default function Home() {
  return (
    <>
      <BackendWarmup />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}

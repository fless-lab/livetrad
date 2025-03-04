"use client"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import AboutSection from "./components/AboutSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import InteractiveBackground from "./components/InteractiveBackground"
import PricingSection from "./components/PricingSection"
import AuthorSection from "./components/AuthorSection"

export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
      <InteractiveBackground />
      <div className="relative z-1">
        <Header />
        <main className="container mx-auto px-4">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <AboutSection />
          <AuthorSection
            email="achilleatarmla@gmail.com"
            name="Abdou-Raouf ATARMLA"
            role="Software & Machine Learning Engineer"
            socialLinks={{
              github: "https://github.com/fless-lab",
              twitter: "https://twitter.com/raouf_code",
              linkedin: "https://linkedin.com/in/abdou-raouf-atarmla",
              email: "mailto:achilleatarmla@gmail.com",
            }}
          />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}


import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import ReviewsSection from "../components/ReviewsSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ChallengeObjectives } from "@/components/ChallengeObjectives";
import { GlobalSports } from "@/components/GlobalSports";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTAFooter } from "@/components/CTAFooter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero /> 
       <ReviewsSection />
        <HowItWorks/>
        <ChallengeObjectives />
        <GlobalSports />
        <WhyChoose />
        <Testimonials />
        <CTAFooter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

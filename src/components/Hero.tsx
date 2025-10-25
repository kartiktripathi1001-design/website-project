import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import sportsHeroBg from "@/assets/sports-hero-bg.png"; // ✅ Your hero background image

export const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center text-white overflow-hidden w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${sportsHeroBg})`,
      }}
    >
      {/* 🔸 Black overlay to darken image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* 🔸 Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-48 py-20">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          <span className="block text-white">Your Skills, Our Bankroll.</span>
          <span className="block text-[#d4af37]">Win Big Together.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Big Profits, Minimal Risk. All from your winning picks. Unlock up to 300k today!
        </p>

        {/* 🔸 Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[#d4af37] hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)]"
          >
            <Link to="/challenges">Get Started Now</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-black border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-semibold text-lg px-8 py-3 rounded-full transition-all"
          >
            <Link to="#giveaway">Enter Giveaway</Link>
          </Button>
        </div>

        {/* 🔸 Video Box Section (With Glowing Golden Border) */}
        <div className="relative mt-16 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.2)] border border-[#d4af37]/50 group">
            
            {/* Soft Glow Behind Video */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#d4af37]/10 via-transparent to-[#d4af37]/10 blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500"></div>

            {/* Animated Golden Border */}
            <div className="absolute inset-0 rounded-2xl border-[2px] border-[#d4af37]/70 shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-goldPulse pointer-events-none"></div>

            {/* Moving Light Shimmer */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <span className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent animate-goldShimmer"></span>
            </div>

            {/* Video Frame */}
            <iframe
              className="relative w-[90vw] md:w-[700px] lg:w-[800px] aspect-video rounded-2xl z-10"
              src="https://www.youtube.com/embed/abcd1234?autoplay=0&mute=1"
              title="Player Profit Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



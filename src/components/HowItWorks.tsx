import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// ✅ Replace these image imports with your own local images from /src/assets/
import step1Img from "@/assets/how-step1.jpg.png";
import step2Img from "@/assets/how-step2.jpg.png";
import step3Img from "@/assets/how-step3.jpg.png";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Challenge",
      description:
        "Pick a challenge that fits your style. Use simulated funds to hit your profit targets and move to the next level.",
      image: step1Img,
    },
    {
      number: "02",
      title: "Prove Your Talent",
      description:
        "Show discipline, manage risk, and pass the challenge successfully. Once you pass, unlock access to bigger bankrolls.",
      image: step2Img,
    },
    {
      number: "03",
      title: "Get Rewarded",
      description:
        "Trade like a pro . The better you perform, the more you can scale — keep the profits, we handle the risk.",
      image: step3Img,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-[#0d0d0d] text-white py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          How It Works
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Complete The Challenge In{" "}
          <span className="text-[#d4af37]">3 Simple Steps</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Prove your skills, pass the challenge, and get rewarded — it’s that
          simple.
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#121212] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-[#d4af37]/10">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#d4af37]/90 text-black font-bold px-3 py-1 rounded-md text-sm shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Gold Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
    </section>
  );
};

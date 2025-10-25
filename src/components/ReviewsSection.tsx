import review1 from "../assets/reviews/review1.png";
import review2 from "../assets/reviews/review2.png";
import review3 from "../assets/reviews/review3.png";
import review4 from "../assets/reviews/review4.png";
import review5 from "../assets/reviews/review5.png";
import review6 from "../assets/reviews/review6.png";


export const ReviewsSection = () => {
  const reviews = [
    { img: review1, name: "David P." },
    { img: review2, name: "Sophia T." },
    { img: review3, name: "Liam K." },
    { img: review4, name: "Ava M." },
    { img: review5, name: "Noah R." },
    { img: review6, name: "Olivia J." },
  ];

  // Duplicate array for infinite scrolling illusion
  const loopedReviews = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 text-center"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0a0a0a]/95 to-black/90 pointer-events-none"></div>

      {/* Title */}
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-white">The Proof Is In </span>
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f3d373] to-[#b9962e] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            The Profit
          </span>
        </h2>
        <p className="text-gray-400 text-lg mt-4">
          See how our traders are cashing out — real payouts, real results.
        </p>
        <div className="mx-auto mt-6 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent animate-pulse"></div>
      </div>

      {/* Auto-Scrolling Container */}
      <div className="relative z-10 flex overflow-hidden">
        <div className="flex animate-scroll gap-6 px-6">
          {loopedReviews.map((review, i) => (
            <div
              key={i}
              className="min-w-[280px] md:min-w-[360px] rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:shadow-[0_0_45px_rgba(212,175,55,0.4)] transition-all duration-500 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-full h-[220px] md:h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border border-[#d4af37]/20 group-hover:border-[#d4af37]/70 transition-all duration-500 rounded-2xl animate-goldPulse pointer-events-none"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="text-[#d4af37] font-semibold">{review.name}</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Verified Funded Trader
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle fade on sides */}
      <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ReviewsSection;

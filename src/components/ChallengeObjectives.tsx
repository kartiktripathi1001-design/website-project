import { useState } from "react";
import { Button } from "@/components/ui/button";

const bankrollData = [
  { amount: "$1,000.00", price: "$29.99" },
  { amount: "$5,000.00", price: "$144.99" },
  { amount: "$10,000.00", price: "$274.99" },
  { amount: "$25,000.00", price: "$649.99" },
  { amount: "$50,000.00", price: "$999.99" },
  { amount: "$100,000.00", price: "$1,999.99" },
];

const betaData = [{ amount: "$10,000.00", price: "$299.00" }];

export const ChallengeObjectives = () => {
  const [activeTab, setActiveTab] = useState("bankroll");
  const [selectedPlan, setSelectedPlan] = useState("$10,000.00");

  const tableData =
    activeTab === "bankroll"
      ? {
          title: "Bankroll Pro",
          price:
            bankrollData.find((p) => p.amount === selectedPlan)?.price || "",
          rows: [
            ["Pick Minimum", "20 picks", "20 picks", "20 picks"],
            ["Minimum Risk", "1%", "1%", "1%"],
            ["Maximum Risk", "5%", "5%", "5%"],
            ["Max Daily Loss", "10%", "10%", "10%"],
            ["Max Drawdown", "15%", "15%", "15%"],
            ["Profit Target", "20%", "20%", "X"],
            ["Inactivity Timer", "None", "None", "5 Days"],
            ["Pick Cashout Fee", "10%", "10%", "10%"],
            ["Live Picking (coming soon)", "YES", "YES", "YES"],
            ["Same Game Parlays", "YES", "YES", "YES"],
            ["Reward Split", "X", "X", "90%"],
          ],
        }
      : {
          title: "Beta Challenge",
          price: "$299.00",
          rows: [
            ["Pick Minimum", "15", "15", "15"],
            ["Minimum Risk", "1%", "1%", "1%"],
            ["Maximum Risk", "5%", "5%", "5%"],
            ["Max Daily Loss", "∞", "∞", "∞"],
            ["Max Drawdown", "10%", "10%", "10%"],
            ["Profit Target", "15%", "15%", "15%"],
            ["Inactivity Timer", "X", "X", "5 Days"],
            ["Pick Cashout Fee", "10%", "10%", "10%"],
            ["Live Picking (coming soon)", "YES", "YES", "YES"],
            ["Same Game Parlays", "YES", "YES", "YES"],
            ["Reward Split", "X", "X", "90%"],
          ],
        };

  return (
    <section
      id="challenge-objectives"
      className="relative bg-black text-white py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Golden backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-[#1a1a1a]/80"></div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="text-white">Challenge</span>{" "}
          <span className="text-[#d4af37]">Objectives</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-6">
          {["bankroll", "beta"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-full font-semibold border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                  : "border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              }`}
            >
              {tab === "bankroll" ? "Bankroll Pro" : "Beta Challenge"}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row md:space-x-10 items-start">
          {/* Left Side */}
          <div className="flex-1 overflow-x-auto animate-fadeIn">
            {/* Bankroll plan buttons */}
            {activeTab === "bankroll" && (
              <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
                {bankrollData.map((plan) => (
                  <button
                    key={plan.amount}
                    onClick={() => setSelectedPlan(plan.amount)}
                    className={`px-5 py-2 rounded-full font-semibold border transition-all duration-300 ${
                      selectedPlan === plan.amount
                        ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                        : "border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10"
                    }`}
                  >
                    {plan.amount}
                  </button>
                ))}
              </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30 backdrop-blur-sm bg-black/60 transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <table className="w-full text-center text-sm md:text-base">
                <thead className="bg-[#d4af37]/10 text-[#d4af37] uppercase text-xs md:text-sm">
                  <tr>
                    <th className="py-3 px-4">Parameter</th>
                    <th className="py-3 px-4">Phase 1</th>
                    <th className="py-3 px-4">Phase 2</th>
                    <th className="py-3 px-4">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-[#d4af37]/10 ${
                        idx % 2 === 0 ? "bg-black/40" : "bg-black/20"
                      }`}
                    >
                      {row.map((cell, i) => (
                        <td key={i} className="py-3 px-4 text-gray-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Price Card */}
          <div className="w-full md:w-[300px] mt-12 md:mt-0">
            <div className="sticky top-24 bg-black/60 border border-[#d4af37]/40 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500">
              <h3 className="text-xl font-bold text-[#d4af37] mb-2">
                {tableData.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {selectedPlan ? selectedPlan : ""}
              </p>
              <div className="text-3xl font-bold text-white mb-6">
                Price:{" "}
                <span className="text-[#d4af37]">{tableData.price}</span>
              </div>
              <Button className="bg-[#d4af37] hover:bg-[#bfa036] text-black font-semibold w-full py-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeObjectives;

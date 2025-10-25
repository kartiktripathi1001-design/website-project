import { useState } from "react";

export const ChallengeObjectives = () => {
  const [activeTab, setActiveTab] = useState("bankroll");
  const [selectedPlan, setSelectedPlan] = useState("$1,000.00");

  const bankrollPlans = [
    { amount: "$1,000.00", price: "$29.99" },
    { amount: "$5,000.00", price: "$144.99" },
    { amount: "$10,000.00", price: "$274.99" },
    { amount: "$25,000.00", price: "$649.99" },
    { amount: "$50,000.00", price: "$999.99" },
    { amount: "$100,000.00", price: "$1,999.99" },
  ];

  const betaPlans = [{ amount: "$10,000.00", price: "$299.00" }];

  const currentPrice =
    activeTab === "bankroll"
      ? bankrollPlans.find((p) => p.amount === selectedPlan)?.price
      : betaPlans[0].price;

  const tableRows =
    activeTab === "bankroll"
      ? [
          ["Pick Minimum", "20 picks", "20 picks", "20 picks"],
          ["Minimum Risk", "1%", "1%", "1%"],
          ["Maximum Risk", "5%", "5%", "5%"],
          ["Max Daily Loss", "10%", "10%", "10%"],
          ["Max Drawdown", "15%", "15%", "15%"],
          ["Profit Target", "20%", "20%", "X"],
          ["Inactivity Timer", "None", "None", "5 Days"],
          ["Pick Cashout Fee", "10%", "10%", "10%"],
          ["Live Picking", "YES", "YES", "YES"],
          ["Same Game Parlays", "YES", "YES", "YES"],
          ["Reward Split", "X", "X", "90%"],
        ]
      : [
          ["Pick Minimum", "15", "15", "15"],
          ["Minimum Risk", "1%", "1%", "1%"],
          ["Maximum Risk", "5%", "5%", "5%"],
          ["Max Daily Loss", "∞", "∞", "∞"],
          ["Max Drawdown", "10%", "10%", "10%"],
          ["Profit Target", "15%", "15%", "15%"],
          ["Inactivity Timer", "X", "X", "5 Days"],
          ["Pick Cashout Fee", "10%", "10%", "10%"],
          ["Live Picking", "YES", "YES", "YES"],
          ["Same Game Parlays", "YES", "YES", "YES"],
          ["Reward Split", "X", "X", "90%"],
        ];

  return (
    <section className="bg-black text-white py-20 px-4 md:px-10">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-10 gap-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("bankroll")}
            className={`px-10 py-3 rounded-full font-semibold border transition-all ${
              activeTab === "bankroll"
                ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                : "border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/20"
            }`}
          >
            Bankroll Pro
          </button>
          <button
            onClick={() => setActiveTab("beta")}
            className={`px-10 py-3 rounded-full font-semibold border transition-all ${
              activeTab === "beta"
                ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                : "border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/20"
            }`}
          >
            Beta Challenge
          </button>
        </div>
      </div>

      {/* Plan Buttons (Only for Bankroll Pro) */}
      {activeTab === "bankroll" && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {bankrollPlans.map((plan) => (
            <button
              key={plan.amount}
              onClick={() => setSelectedPlan(plan.amount)}
              className={`px-5 py-2 rounded-full font-semibold border transition-all ${
                selectedPlan === plan.amount
                  ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                  : "border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10"
              }`}
            >
              {plan.amount}
            </button>
          ))}
        </div>
      )}

      {/* Beta Challenge fixed single plan */}
      {activeTab === "beta" && (
        <div className="flex justify-center mb-10">
          <div className="px-6 py-2 rounded-full bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.6)]">
            $10,000.00
          </div>
        </div>
      )}

      {/* Challenge Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[#d4af37] text-sm md:text-base border-b border-[#d4af37]/30 bg-[#d4af37]/10">
              <th className="py-3 text-left pl-4">Parameter</th>
              <th className="py-3 text-center">Phase 1</th>
              <th className="py-3 text-center">Phase 2</th>
              <th className="py-3 text-center">Reward</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr
                key={i}
                className={`text-gray-300 text-sm md:text-base ${
                  i % 2 === 0 ? "bg-black/50" : "bg-[#1a1a1a]/70"
                } border-b border-[#d4af37]/10`}
              >
                <td className="py-3 pl-4">{row[0]}</td>
                <td className="text-center">{row[1]}</td>
                <td className="text-center">{row[2]}</td>
                <td className="text-center">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Price Box + Buy Now Button */}
      <div className="flex flex-col items-center justify-center text-center mt-12">
        <div className="border border-[#d4af37]/60 rounded-xl px-8 py-4 text-lg font-semibold mb-6 bg-black/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          Price: <span className="text-[#d4af37]">{currentPrice}</span>
        </div>
        <button className="px-10 py-3 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#bfa036] transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)]">
          Buy Now
        </button>
      </div>
    </section>
  );
};

export default ChallengeObjectives;

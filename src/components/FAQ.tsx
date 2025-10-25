import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQ = () => {
  const [activeTab, setActiveTab] = useState("platform");
  const [openQuestions, setOpenQuestions] = useState<number[]>([]); // multiple open support

  // 🩹 FIX: Reset open questions when switching tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenQuestions([]); // close all when switching
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const platformFAQs = [
    {
      question: "Why Has My Trade Not Settled Yet?",
      answer: `
At Player Profit, we prioritize accuracy and fairness when grading your picks. While most trades are settled quickly, some delays can occur due to our reliance on official data providers. Below, we break down how grading works, why some trades may remain open, and what to do if you're waiting on a result.

**How Long Does Trade Grading Take?**
Our system aims to grade most picks promptly, but grading times depend on the type of pick and the availability of verified data. Here's what to expect:

**Standard Grading Times**
- **Moneyline, Spreads, Totals (Over/Under):** Typically graded within 15 minutes of the game ending—provided all official sources report consistent results. In rare cases, grading may take up to 2 hours.  
- **Props & Futures:** Usually settled within 1–2 hours after the event concludes. Longer delays may occur if data inconsistencies arise.  
- **Quarter Picks & Live Props:** Graded once the specific quarter or event is complete. We require confirmation from at least three trusted data sources before grading.

**Why Is My Pick Still Open?**
- The Game Isn’t Fully Completed  
- Third-Party Data Lag  
- Discrepancies in Official Scoring  
- Manual Review Required  

**Our Commitment**
We use multiple trusted data sources, strict verification, and fairness-first policies to ensure every result is accurate.`,
    },
    {
      question: "Am I Trading On A Demo Account Or Live Account?",
      answer: `
**Simulated Environments**
Trading in all stages of cooperation between Player Profit and the client is via a demo account.

A Simulated Funded Account mirrors real odds provided from sportsbook providers. The data is shared with trusted sports data partners for analysis and insight generation.

**Disclaimer:** Hypothetical or simulated performance results have limitations and do not represent actual trading. Results may differ due to lack of liquidity, hindsight bias, and other factors. No guarantee of real profit is implied. (CFTC Rule 4.41)`,
    },
    {
      question: "I Am Now Funded, Am I Trading Real Money?",
      answer: `
After becoming a Simulated Player Profit, you receive a demo account with simulated funds.

This account mirrors real sportsbook odds and operates using verified sports data. These are simulated trades designed to replicate real-world conditions.  

**Disclaimer:** Simulated results are not real trading outcomes and should not be taken as profit guarantees. (CFTC Rule 4.41)`,
    },
    {
      question: "Which Sportsbook Do You Use To Simulate Odds Data?",
      answer: `
At Player Profit, we mirror **DraftKings’ odds** as closely as possible to provide a realistic and competitive market.

DraftKings’ reputation for fairness and accurate line setting makes it our benchmark. This ensures your experience reflects real-world conditions — without direct integration — and allows for strategic, informed picks.`,
    },
    {
      question: "How Do I Withdraw My Rewards?",
      answer: `
Your reward split follows a **rolling 30-day cycle.**  

- Example: Start August 1 → first split on August 31.  
- Withdraw options: **Bank Wire, Crypto, PayPal, Venmo, CashApp, Zelle.**  

Processing usually takes **1–2 business days** once confirmed.  
**Minimums:** $20 for wire, $50 for crypto.  

This structure supports a sustainable reward model while rewarding strong performance.`,
    },
  ];

  const rulesFAQs = [
    {
      question: "What Is The Legal Relationship Between a Sports Trader and Player Profit?",
      answer: `
A contractual agreement establishes the relationship between the trader and Player Profit.  

After passing the verification phases, you’ll sign a contract outlining all **rights, responsibilities, and obligations** of both parties.`,
    },
    {
      question: "What Is The Process of Signing the Contract?",
      answer: `
Once you hit your **Profit Target** while respecting drawdown limits:  
- The Player Profit Identity section unlocks in your dashboard.  
- Submit KYC details for verification:  
  - Personal accounts: 1 business day  
  - Company accounts: up to 3 business days  
Once verified, your data is stored securely for account management.`,
    },
    {
      question: "Do I Tax My Rewards?",
      answer: `
Yes. Payouts are considered taxable income.  
- **US residents:** Receive 1099 forms during tax season.  
- **International users:** Must comply with local tax laws.`,
    },
    {
      question: "Why Use Player Profit?",
      answer: `
Player Profit removes the barriers that limit growth.  

**Challenges solved:**  
- Limited capital  
- Fear of losses  
- Lack of structure and discipline  

**Benefits:**  
Access to simulated accounts up to $100,000, keep **70%–85%** of profits every 30 days, use real data and risk-managed tools designed for long-term consistency.`,
    },
    {
      question: "How Do You Process Rewards on Funded Accounts?",
      answer: `
**Payout Methods:**  
- ACH Bank Transfer  
- Cryptocurrency  
- PayPal, Venmo, Zelle  

Processing may take a few minutes up to several days.  

**Tax Info:**  
US citizens receive 1099s; international users must follow local regulations.`,
    },
    {
      question: "How Do I Purchase Another Challenge? Can I Use The Same Email?",
      answer: `
Yes! Simply visit  
👉 [https://www.playerprofit.com/challenges](https://www.playerprofit.com/challenges)  
or click the ⚡ icon on your dashboard.`,
    },
    {
      question: "How to Become a Player Profit Trader?",
      answer: `
To become a Player Profit Player, complete the **2-step Evaluation**:  

**Phase 1:** Grow your account by 20% with ≤15% drawdown.  
**Phase 2:** Repeat under same rules.  
**Phase 3:** Get funded after KYC verification.  

Applicants with sanctions, financial crimes, or under 18 are ineligible.`,
    },
    {
      question: "General Challenge Rules",
      answer: `
**How to Pass:**  
- At least 20 picks per phase.  
- 20% growth in Phase 1 & 2.  

**Drawdown Rules:**  
- Max Daily Loss: 10%  
- Max Total Drawdown: 15%  

**Other:**  
- Pick Cashouts: 10% fee  
- Funded accounts must trade every 5 days  
- Delays >8h → refunded.`,
    },
    {
      question: "What Sports & Markets Are Available?",
      answer: `
**Current sports supported:**  
Football (NFL, NCAAF), Basketball (NBA, WNBA), Baseball (MLB), Hockey (NHL), MMA (UFC), Soccer (Premier League, La Liga, MLS, etc.), Tennis, Golf (PGA).  

Our coverage continuously expands to more leagues and regions.`,
    },
    {
      question: "If A Funded Account Is Violated, Am I Eligible For Rewards?",
      answer: `
No.  
If rules are breached or limits violated, the account is deactivated immediately and rewards become ineligible.  

To regain access, the user must start a new challenge.`,
    },
    {
      question: "Why Is My Pick Labeled As Outstanding?",
      answer: `
It means the pick has been placed but not yet settled or graded.  
Once the event concludes and official data confirms results, the status will update automatically.`,
    },
  ];

  const currentFAQs = activeTab === "platform" ? platformFAQs : rulesFAQs;

  return (
    <section id="faq" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#d4af37] font-medium mb-4 uppercase tracking-wider">
              FAQs
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              Your Questions, Answered.
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {["platform", "rules"].map((tab) => (
              <Button
                key={tab}
                onClick={() => handleTabChange(tab)} // ✅ fixed handler
                className={`rounded-full px-10 py-4 text-lg font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#d4af37] text-black scale-105 shadow-lg"
                    : "bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 hover:scale-105"
                }`}
              >
                {tab === "platform" ? "Our Platform" : "Platform Rules"}
              </Button>
            ))}
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {currentFAQs.map((faq, index) => {
              const isOpen = openQuestions.includes(index);
              return (
                <div
                  key={index}
                  className={`border border-[#d4af37]/30 rounded-lg bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300`}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#111]/60 transition-colors duration-300 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#d4af37] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4 prose prose-invert max-w-none text-gray-300 leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: faq.answer.replace(/\n/g, "<br />"),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


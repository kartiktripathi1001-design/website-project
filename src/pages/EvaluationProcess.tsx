import { TickerBanner } from "@/components/TickerBanner";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

const EvaluationProcess = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Initial Challenge",
      icon: CheckCircle,
      requirements: [
        "Minimum 15 bets required",
        "20% profit target",
        "Maximum 10% daily loss",
        "Maximum 15% drawdown",
        "Minimum bet size varies by account"
      ],
      description: "Demonstrate your trading skills with simulated funds while meeting our risk management criteria."
    },
    {
      phase: "Phase 2", 
      title: "Verification Challenge",
      icon: Clock,
      requirements: [
        "Minimum 15 bets required",
        "20% profit target", 
        "Maximum 10% daily loss",
        "Maximum 15% drawdown",
        "Consistent trading approach"
      ],
      description: "Prove consistency and risk management skills to qualify for funded trading."
    },
    {
      phase: "Phase 3",
      title: "Funded Trading",
      icon: TrendingUp,
      requirements: [
        "Minimum 15 bets per month",
        "No profit target",
        "Maximum 10% daily loss",
        "Maximum 15% drawdown", 
        "80% profit share"
      ],
      description: "Trade with real funds and keep up to 80% of the profits you generate."
    }
  ];

  return (
    <div className="min-h-screen">
      <TickerBanner />
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Evaluation Process
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive 3-phase evaluation process ensures that only skilled and disciplined traders 
                receive funding. Each phase is designed to test different aspects of your trading abilities.
              </p>
            </div>

            {/* Process Overview */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {phases.map((phase, index) => (
                <Card key={index} className="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <phase.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-sm text-primary font-semibold">{phase.phase}</div>
                    <CardTitle className="text-2xl">{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center">
                      {phase.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {phase.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-muted-foreground flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Rules */}
            <Card className="bg-card-gradient border-border mb-12">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Trading Rules & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Risk Management</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Maximum daily loss: 10% of account balance</li>
                      <li>• Maximum total drawdown: 15% of starting balance</li>
                      <li>• Position sizing limits based on account size</li>
                      <li>• No overnight holds on certain markets</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Trading Requirements</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Minimum 15 trades per evaluation period</li>
                      <li>• Consistent trading approach required</li>
                      <li>• All major sports markets available</li>
                      <li>• Real-time monitoring and feedback</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Profit Sharing</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-2">80%</div>
                      <div className="text-sm text-muted-foreground">Your Share</div>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-2">20%</div>
                      <div className="text-sm text-muted-foreground">Platform Fee</div>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-2">Bi-weekly</div>
                      <div className="text-sm text-muted-foreground">Payout Schedule</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mr-4">
                <Link to="/challenges">Start Challenge</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EvaluationProcess;
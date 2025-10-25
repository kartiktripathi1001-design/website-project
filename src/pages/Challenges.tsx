import { TickerBanner } from "@/components/TickerBanner";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TrendingUp, Shield, Clock, Users } from "lucide-react";

interface Challenge {
  id: string;
  name: string;
  balance: number;
  base_price: number;
  type: string;
  steps: number;
  phase1_target: number;
  phase2_target: number;
  phase3_target: number | null;
  max_drawdown: number;
  reward_split: number;
}

const Challenges = () => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro'>('standard');
  const [selectedBalance, setSelectedBalance] = useState<number>(5000);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('balance', { ascending: true });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast.error('Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedChallenge = () => {
    return challenges.find(
      c => c.type === selectedPlan && c.balance === selectedBalance
    );
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please sign in to enroll in a challenge');
      navigate('/auth');
      return;
    }

    const challenge = getSelectedChallenge();
    if (!challenge) {
      toast.error('Challenge not found');
      return;
    }

    setEnrolling(true);
    try {
      const { error } = await supabase
        .from('challenge_enrollments')
        .insert({
          user_id: user.id,
          challenge_id: challenge.id,
          total_paid: challenge.base_price,
          current_balance: challenge.balance,
          max_balance: challenge.balance,
        });

      if (error) throw error;
      
      toast.success('Successfully enrolled in challenge!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in challenge');
    } finally {
      setEnrolling(false);
    }
  };

  const availableBalances = Array.from(
    new Set(challenges.filter(c => c.type === selectedPlan).map(c => c.balance))
  ).sort((a, b) => a - b);

  const benefits = [
    {
      icon: TrendingUp,
      title: "High Profit Potential",
      description: "Earn up to 85% of profits with our funded accounts"
    },
    {
      icon: Shield,
      title: "Risk-Free Trading",
      description: "Trade with our capital, not yours. No personal financial risk"
    },
    {
      icon: Clock,
      title: "Fast Payouts",
      description: "Get paid bi-weekly or weekly based on your performance"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of successful traders in our community"
    }
  ];

  const selectedChallenge = getSelectedChallenge();

  if (loading) {
    return (
      <div className="min-h-screen">
        <TickerBanner />
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading challenges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TickerBanner />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Choose Your <span className="text-primary">Challenge</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                Select between Standard and Pro plans to start your trading journey.
              </p>
            </div>
          </div>
        </section>

        {/* Challenge Configuration */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Plan Selection */}
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="flex bg-secondary/20 p-2 rounded-full">
                  <Button
                    variant={selectedPlan === 'standard' ? 'default' : 'ghost'}
                    className={`px-8 py-3 rounded-full transition-all ${
                      selectedPlan === 'standard' 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-foreground hover:bg-secondary/40'
                    }`}
                    onClick={() => {
                      setSelectedPlan('standard');
                      const firstBalance = challenges.find(c => c.type === 'standard')?.balance;
                      if (firstBalance) setSelectedBalance(firstBalance);
                    }}
                  >
                    Standard (2-Step)
                  </Button>
                  <Button
                    variant={selectedPlan === 'pro' ? 'default' : 'ghost'}
                    className={`px-8 py-3 rounded-full transition-all ${
                      selectedPlan === 'pro' 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-foreground hover:bg-secondary/40'
                    }`}
                    onClick={() => {
                      setSelectedPlan('pro');
                      const firstBalance = challenges.find(c => c.type === 'pro')?.balance;
                      if (firstBalance) setSelectedBalance(firstBalance);
                    }}
                  >
                    Pro (3-Step)
                  </Button>
                </div>
              </div>

              {/* Funding Amount Selection */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6">Select Funding Amount</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {availableBalances.map((balance) => (
                    <Button
                      key={balance}
                      variant={selectedBalance === balance ? 'default' : 'outline'}
                      className={`h-12 md:h-14 text-base md:text-lg font-semibold ${
                        selectedBalance === balance 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
                      }`}
                      onClick={() => setSelectedBalance(balance)}
                    >
                      ${balance.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              {selectedChallenge && (
                <>
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-block bg-card border border-border rounded-lg px-6 md:px-8 py-3 md:py-4">
                      <span className="text-xl md:text-2xl font-bold">
                        Price: ${selectedChallenge.base_price}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        • {selectedChallenge.reward_split}% profit split
                      </span>
                    </div>
                  </div>

                  {/* Phase Details */}
                  <Tabs defaultValue="phase1" className="w-full">
                    <TabsList className="grid w-full grid-cols-{selectedChallenge.steps} bg-secondary/20">
                      <TabsTrigger value="phase1" className="text-base md:text-lg py-2 md:py-3">
                        Phase 1
                      </TabsTrigger>
                      <TabsTrigger value="phase2" className="text-base md:text-lg py-2 md:py-3">
                        Phase 2
                      </TabsTrigger>
                      {selectedChallenge.steps === 3 && (
                        <TabsTrigger value="phase3" className="text-base md:text-lg py-2 md:py-3">
                          Phase 3
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="phase1" className="mt-6 md:mt-8">
                      <Card className="bg-card-gradient">
                        <CardHeader>
                          <CardTitle className="text-xl md:text-2xl text-center">Phase 1 - Evaluation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 md:space-y-6">
                          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Profit Target</span>
                              <span className="font-semibold text-base md:text-lg text-primary">
                                ${selectedChallenge.phase1_target}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Max Drawdown</span>
                              <span className="font-semibold text-base md:text-lg text-destructive">
                                ${selectedChallenge.max_drawdown}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Balance</span>
                              <span className="font-semibold text-base md:text-lg">
                                ${selectedChallenge.balance.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Reward Split</span>
                              <span className="font-semibold text-base md:text-lg text-primary">
                                {selectedChallenge.reward_split}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="phase2" className="mt-6 md:mt-8">
                      <Card className="bg-card-gradient">
                        <CardHeader>
                          <CardTitle className="text-xl md:text-2xl text-center">Phase 2 - Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 md:space-y-6">
                          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Profit Target</span>
                              <span className="font-semibold text-base md:text-lg text-primary">
                                ${selectedChallenge.phase2_target}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Max Drawdown</span>
                              <span className="font-semibold text-base md:text-lg text-destructive">
                                ${selectedChallenge.max_drawdown}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Balance</span>
                              <span className="font-semibold text-base md:text-lg">
                                ${selectedChallenge.balance.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                              <span className="text-muted-foreground text-sm md:text-base">Reward Split</span>
                              <span className="font-semibold text-base md:text-lg text-primary">
                                {selectedChallenge.reward_split}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {selectedChallenge.steps === 3 && selectedChallenge.phase3_target && (
                      <TabsContent value="phase3" className="mt-6 md:mt-8">
                        <Card className="bg-card-gradient">
                          <CardHeader>
                            <CardTitle className="text-xl md:text-2xl text-center">Phase 3 - Final</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 md:space-y-6">
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                              <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                                <span className="text-muted-foreground text-sm md:text-base">Profit Target</span>
                                <span className="font-semibold text-base md:text-lg text-primary">
                                  ${selectedChallenge.phase3_target}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                                <span className="text-muted-foreground text-sm md:text-base">Max Drawdown</span>
                                <span className="font-semibold text-base md:text-lg text-destructive">
                                  ${selectedChallenge.max_drawdown}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                                <span className="text-muted-foreground text-sm md:text-base">Balance</span>
                                <span className="font-semibold text-base md:text-lg">
                                  ${selectedChallenge.balance.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 md:py-3 border-b border-border">
                                <span className="text-muted-foreground text-sm md:text-base">Reward Split</span>
                                <span className="font-semibold text-base md:text-lg text-primary">
                                  {selectedChallenge.reward_split}%
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}
                  </Tabs>

                  {/* Purchase Button */}
                  <div className="text-center mt-6 md:mt-8">
                    <Button
                      size="lg"
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
                    >
                      {enrolling ? 'Enrolling...' : `Get Started - $${selectedChallenge.base_price}`}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Why Choose Our Challenges?</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 text-center">
                    <CardContent className="p-4 md:p-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                        <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{benefit.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Challenges;

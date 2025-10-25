import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, TrendingUp, HeadphonesIcon, Users } from "lucide-react";

export const WhyChoose = () => {
  const features = [
    {
      icon: Shield,
      title: "Risk-Free Testing",
      description: "Prove your skills in a simulated environment without risking your own money."
    },
    {
      icon: TrendingUp,
      title: "High Rewards",
      description: "Earn up to 80% of your simulated profits once funded."
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Access to expert insights and support to help you succeed in your trading journey."
    },
    {
      icon: Users,
      title: "Community of Traders",
      description: "Join a community of like-minded sports traders and grow together"
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose Funded Sports Trader?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your trading potential with risk-free testing, expert support, 
            and high rewards, all within a thriving community of sports traders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/challenges">Join Our Community</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
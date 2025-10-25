import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Trophy, Target } from "lucide-react";

export const GlobalSports = () => {
  const stats = [
    {
      icon: Globe,
      number: "195+",
      title: "Countries Covered",
      description: "Bet on sports from over 195 countries, giving you access to hundreds events and games from all over the world in one place."
    },
    {
      icon: Trophy,
      number: "30+",
      title: "Leagues",
      description: "Engage with over 30 major leagues, including premier football, basketball, and baseball leagues from across the globe."
    },
    {
      icon: Target,
      number: "10+",
      title: "Major Sports",
      description: "Focus on the sports you love — football, basketball, baseball, hockey, and tennis. Whether you're an expert in one or all, our platform supports your passion."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Bet on Sports Across the Globe
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            At Funded Sports Trader, we offer an unparalleled range of sports and leagues to bet on, 
            ensuring you can showcase your expertise no matter your sport of choice.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/challenges">Explore Our Markets</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold mb-4">{stat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/challenges">Explore Our Markets</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
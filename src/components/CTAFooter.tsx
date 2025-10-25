import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const CTAFooter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "Thank you for signing up! We'll be in touch soon.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-card-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't let your sports betting talent go unnoticed. Join Funded Sports Trader today, 
            take on the challenge, and start your journey towards becoming a professional funded trader.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border"
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Get started
            </Button>
          </form>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Alternative:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                WPA
              </Button>
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Enter Giveaway
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
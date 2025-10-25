import { Routes, Route } from "react-router-dom";
import { TickerBanner } from "@/components/TickerBanner";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Company = () => (
  <div className="min-h-screen">
    <TickerBanner />
    <Header />
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">Our Company</h1>
          
          <Card className="bg-card-gradient border-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">About Funded Sports Trader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Funded Sports Trader is the premier platform for aspiring sports trading professionals. 
                We provide talented individuals with the opportunity to showcase their skills using our capital, 
                eliminating the financial risk while maximizing profit potential.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to democratize access to sports trading capital and create opportunities for 
                skilled traders to build sustainable careers in sports betting and trading.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card-gradient border-border">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide talented sports traders with the capital and support they need to succeed, 
                  while maintaining the highest standards of risk management and professionalism.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the global leader in funded sports trading, creating opportunities for thousands 
                  of traders worldwide to turn their passion into a profitable career.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/challenges">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const Team = () => (
  <div className="min-h-screen">
    <TickerBanner />
    <Header />
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">Our Team</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Meet the passionate professionals behind Funded Sports Trader.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Michael Johnson", role: "CEO & Founder", bio: "Former professional trader with 15+ years experience in sports betting markets." },
              { name: "Sarah Chen", role: "CTO", bio: "Technology leader with expertise in trading platforms and risk management systems." },
              { name: "David Rodriguez", role: "Head of Trading", bio: "Expert trader and risk manager with deep knowledge of sports markets." },
            ].map((member, index) => (
              <Card key={index} className="bg-card-gradient border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

const Careers = () => (
  <div className="min-h-screen">
    <TickerBanner />
    <Header />
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">Careers</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Join our growing team and help shape the future of sports trading.
          </p>
          
          <Card className="bg-card-gradient border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center">We're Growing!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                We're always looking for talented individuals to join our team. 
                Check back soon for new opportunities or reach out to us directly.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:careers@fundedsportstrader.com">Contact Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
);

const About = () => {
  return (
    <Routes>
      <Route path="/company" element={<Company />} />
      <Route path="/team" element={<Team />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="*" element={<Company />} />
    </Routes>
  );
};

export default About;
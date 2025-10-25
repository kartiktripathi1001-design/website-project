import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Steven",
      role: "Professional Sports Trader",
      content: "The challenges are demanding, but that's what makes them so rewarding. Overcoming the challenge was a major milestone in my trading career.",
      avatar: "/api/placeholder/162/162",
      rating: 5
    },
    {
      name: "Sarah L.",
      role: "Professional Sports Trader", 
      content: "The challenges are tough, but that's what makes them worth it. Passing the challenge was a huge milestone in my trading career.",
      avatar: "/api/placeholder/162/162",
      rating: 5
    },
    {
      name: "John D.",
      role: "Funded Sports Trader Member",
      content: "Funded Sports Trader gave me platform to showcase my skills without the financial risk. Now I'm trading with real funds and earning consistent profits!",
      avatar: "/api/placeholder/162/162",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our Traders Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
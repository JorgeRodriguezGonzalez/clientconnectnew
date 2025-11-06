import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell & Co Lawyers",
    role: "Managing Partner",
    content: "Client Connect Australia transformed our online presence. Within 6 months, we saw a 180% increase in qualified leads. Their team truly understands the Sydney market.",
    rating: 5,
  },
  {
    name: "James Chen",
    company: "Urban Fitness Studio",
    role: "Owner",
    content: "The ROI from our Google Ads campaigns has been incredible. We're now getting 3x more bookings at half the cost per acquisition. Best investment we've made.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    company: "Thompson Dental Care",
    role: "Practice Manager",
    content: "Their social media management has been outstanding. Patient engagement is up 250% and we're consistently booked out weeks in advance. Highly recommend!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-bg-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-text-medium">
            Real results from real Sydney businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-text-medium mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-text-dark">{testimonial.name}</div>
                    <div className="text-sm text-text-light">{testimonial.role}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

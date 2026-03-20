import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, User, Building2, Globe, MessageSquare, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { COLORS } from "@/lib/design-tokens";

const PRIMARY = "#34d399";
const SECONDARY = "#06b6d4";
const PRIMARY_RGB = "52,211,153";
const SECONDARY_RGB = "6,182,212";

const FormInput = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-zinc-300 mb-1 text-left">
      {label} {required && <span style={{ color: SECONDARY }}>*</span>}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-4 w-4 text-zinc-500" />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-200 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
      />
    </div>
  </div>
);

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    url: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: "80px" }}>
          <div
            style={{
              position: "absolute",
              top: "180px",
              left: "50%",
              marginLeft: "-250px",
              width: "500px",
              height: "500px",
              background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "200px",
              left: "50%",
              marginLeft: "-50px",
              width: "600px",
              height: "600px",
              background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div style={{ textAlign: "center", paddingTop: "180px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
            <h1
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: "clamp(42px, 8vw, 68px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-2px",
                margin: 0,
                color: "#fff",
              }}
            >
              <span>Let's Grow Your</span>
              <br />
              <motion.span
                initial={{ backgroundPosition: "400% 50%" }}
                animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${PRIMARY}, ${SECONDARY}, transparent)`,
                  backgroundSize: "400% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Business.
              </motion.span>
            </h1>

            <p
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: "clamp(14px, 1.5vw, 16px)",
                fontWeight: 300,
                color: "#fff",
                maxWidth: "560px",
                margin: "24px auto 0",
                lineHeight: 1.65,
                padding: "0 20px",
              }}
            >
              Ready to take your digital marketing to the next level? Get in touch for a{" "}
              <span style={{ color: PRIMARY, fontWeight: 600 }}>free consultation</span>.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-black">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-[#050505] border border-white/10 rounded-2xl shadow-2xl shadow-black/20 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-10"
                    >
                      <div className="rounded-full p-3" style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}>
                        <Check className="h-8 w-8" style={{ color: PRIMARY }} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                      <p className="text-zinc-400 max-w-md text-center">
                        Thanks for reaching out. One of our strategists will review your details and contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {/* Row 1: Name & Email */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput
                          icon={User}
                          label="Full Name"
                          name="name"
                          placeholder="John Smith"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <FormInput
                          icon={Mail}
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Row 2: Phone & Company */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput
                          icon={Phone}
                          label="Phone"
                          name="phone"
                          type="tel"
                          placeholder="+61 4XX XXX XXX"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <FormInput
                          icon={Building2}
                          label="Company"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Row 3: Website URL */}
                      <FormInput
                        icon={Globe}
                        label="Website URL"
                        name="url"
                        type="url"
                        placeholder="https://yourwebsite.com.au"
                        value={formData.url}
                        onChange={handleChange}
                      />

                      {/* Service Select */}
                      <div>
                        <label htmlFor="service" className="block text-xs font-semibold text-zinc-300 mb-1 text-left">
                          Service of Interest <span style={{ color: SECONDARY }}>*</span>
                        </label>
                        <Select
                          required
                          value={formData.service}
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-200 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] h-auto">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#111] border border-white/10 text-white">
                            <SelectItem value="seo">SEO</SelectItem>
                            <SelectItem value="google-ads">Google Ads</SelectItem>
                            <SelectItem value="web-design">Web Design & Development</SelectItem>
                            <SelectItem value="social-media">Social Media Management</SelectItem>
                            <SelectItem value="social-ads">Social Media Advertising</SelectItem>
                            <SelectItem value="other">Not Sure / Multiple Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 mb-1 text-left">
                          Message <span style={{ color: SECONDARY }}>*</span>
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute top-3 left-0 flex items-start pl-3">
                            <MessageSquare className="h-4 w-4 text-zinc-500" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Tell us about your business and goals..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-200 outline-none resize-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
                          />
                        </div>
                      </div>

                      {/* Submit + Trust */}
                      <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
                        <Button
                          size="lg"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto h-12 px-10 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 rounded-lg border-0 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                          style={{ backgroundImage: `linear-gradient(135deg, ${SECONDARY}, ${PRIMARY})` }}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Send Message
                              <Send className="h-4 w-4" />
                            </span>
                          )}
                        </Button>

                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                          {["No contracts", "Free consultation", "24h response"].map((text) => (
                            <div key={text} className="flex items-center gap-1.5">
                              <div className="rounded-full p-0.5" style={{ backgroundColor: "rgba(52, 211, 153, 0.15)" }}>
                                <Check className="h-3 w-3" style={{ color: PRIMARY }} strokeWidth={3} />
                              </div>
                              <span className="text-xs font-medium text-zinc-400">{text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <Mail className="h-5 w-5" style={{ color: SECONDARY }} />
                      </div>
                      <div>
                        <div className="font-medium mb-1 text-white">Email</div>
                        <a href="mailto:hello@clientconnect.com.au" className="text-zinc-400 hover:text-[#06b6d4] transition-colors">
                          hello@clientconnect.com.au
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <Phone className="h-5 w-5" style={{ color: SECONDARY }} />
                      </div>
                      <div>
                        <div className="font-medium mb-1 text-white">Phone</div>
                        <a href="tel:+61-2-xxxx-xxxx" className="text-zinc-400 hover:text-[#06b6d4] transition-colors">
                          +61 2 xxxx xxxx
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <MapPin className="h-5 w-5" style={{ color: SECONDARY }} />
                      </div>
                      <div>
                        <div className="font-medium mb-1 text-white">Location</div>
                        <p className="text-zinc-400">Sydney, NSW, Australia</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <Clock className="h-5 w-5" style={{ color: SECONDARY }} />
                      </div>
                      <div>
                        <div className="font-medium mb-1 text-white">Business Hours</div>
                        <p className="text-zinc-400">Mon - Fri: 9:00 AM - 5:00 PM</p>
                        <p className="text-zinc-400">Sat - Sun: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-white">What Happens Next?</h3>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span
                        className="flex-shrink-0 h-6 w-6 rounded-full text-white text-sm flex items-center justify-center"
                        style={{ backgroundImage: `linear-gradient(135deg, ${SECONDARY}, ${PRIMARY})` }}
                      >
                        1
                      </span>
                      <span className="text-zinc-400">We'll review your inquiry within 24 hours</span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        className="flex-shrink-0 h-6 w-6 rounded-full text-white text-sm flex items-center justify-center"
                        style={{ backgroundImage: `linear-gradient(135deg, ${SECONDARY}, ${PRIMARY})` }}
                      >
                        2
                      </span>
                      <span className="text-zinc-400">Schedule a free 30-minute strategy call</span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        className="flex-shrink-0 h-6 w-6 rounded-full text-white text-sm flex items-center justify-center"
                        style={{ backgroundImage: `linear-gradient(135deg, ${SECONDARY}, ${PRIMARY})` }}
                      >
                        3
                      </span>
                      <span className="text-zinc-400">Receive a customized proposal</span>
                    </li>
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
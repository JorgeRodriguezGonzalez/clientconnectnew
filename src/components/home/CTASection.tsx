import React, { useRef, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Send, User, Mail, Phone, Building2, Globe, MessageSquare } from "lucide-react";

// --- UTILIDADES ---
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// --- CONSTANTES (Brand Colors) ---
const COLORS = {
  primary: "hsl(187, 94%, 43%)",
  primaryLight: "hsl(187, 94%, 53%)",
  secondary: "hsl(160, 64%, 52%)",
  secondaryLight: "hsl(160, 64%, 62%)",
  textDark: "hsl(0, 0%, 10%)",
  textMedium: "hsl(0, 0%, 33%)",
  textLight: "hsl(0, 0%, 46%)",
};

// --- COMPONENTE GLOWING EFFECT ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
    glow?: boolean;
    className?: string;
    disabled?: boolean;
    movementDuration?: number;
    borderWidth?: number;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = React.useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e as any);

      window.addEventListener("scroll", handleScroll, { passive: true } as any);
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      } as any);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient": `radial-gradient(circle, hsl(187 94% 43%) 10%, hsl(187 94% 43% / 0) 20%),
                radial-gradient(circle at 40% 40%, hsl(187 94% 53%) 5%, hsl(187 94% 53% / 0) 15%),
                radial-gradient(circle at 60% 60%, hsl(160 64% 52%) 10%, hsl(160 64% 52% / 0) 20%), 
                radial-gradient(circle at 40% 60%, hsl(160 64% 62%) 10%, hsl(160 64% 62% / 0) 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  hsl(187 94% 43%) 0%,
                  hsl(187 94% 53%) calc(25% / var(--repeating-conic-gradient-times)),
                  hsl(160 64% 52%) calc(50% / var(--repeating-conic-gradient-times)), 
                  hsl(160 64% 62%) calc(75% / var(--repeating-conic-gradient-times)),
                  hsl(187 94% 43%) calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- INPUT COMPONENT ---
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
  <div className="relative">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5 text-left">
      {label} {required && <span style={{ color: COLORS.primary }}>*</span>}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <Icon className="h-4 w-4" style={{ color: COLORS.textLight }} />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-none border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none focus:border-[hsl(187,94%,43%)] focus:ring-1 focus:ring-[hsl(187,94%,43%)]"
      />
    </div>
  </div>
);

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    url: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Integrar con tu backend / API
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* --- TOP BORDER LINE --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      {/* Background Gradient Blurs */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-50/50 to-transparent -z-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Central Card */}
        <div className="max-w-4xl mx-auto relative group">
          {/* Glowing Effect Wrapper */}
          <div className="absolute -inset-[1px] rounded-none">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white border border-zinc-200 p-8 md:p-16 shadow-2xl shadow-gray-200/50"
          >
            {/* Top Label */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-widest text-gray-500">
                <Sparkles className="w-3 h-3" style={{ color: COLORS.primary }} />
                Start Your Journey
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 tracking-tight leading-[1.1] text-center">
              Ready to grow your
              <br className="hidden md:block" />
              <motion.span
                initial={{ backgroundPosition: "400% 50%" }}
                animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                transition={{
                  duration: 12,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="mt-2 inline-block"
                style={{
                  backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${COLORS.primary}, ${COLORS.primaryLight}, ${COLORS.secondary}, ${COLORS.secondaryLight}, rgba(255,255,255,0))`,
                  backgroundSize: "400% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {" "}business today?
              </motion.span>
            </h2>

            <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: COLORS.textLight }}>
              Tell us about your project and we'll get back to you within 24 hours with a free tailored strategy.
            </p>

            {/* ---- SUCCESS STATE ---- */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12"
              >
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: "hsl(160 64% 52% / 0.1)" }}
                >
                  <Check className="h-8 w-8" style={{ color: COLORS.secondary }} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 max-w-md text-center">
                  Thanks for reaching out. One of our strategists will review your details and contact you shortly.
                </p>
              </motion.div>
            ) : (
              /* ---- FORM ---- */
              <div className="space-y-6">
                {/* Row 1: Name & Email */}
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="grid md:grid-cols-2 gap-5">
                  <FormInput
                    icon={Phone}
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+61 400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <FormInput
                    icon={Building2}
                    label="Company Name"
                    name="company"
                    placeholder="Acme Pty Ltd"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                {/* Row 3: URL */}
                <FormInput
                  icon={Globe}
                  label="Website URL"
                  name="url"
                  type="url"
                  placeholder="https://yourwebsite.com.au"
                  value={formData.url}
                  onChange={handleChange}
                />

                {/* Row 4: Message */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5 text-left">
                    How can we help? <span style={{ color: COLORS.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute top-3.5 left-0 flex items-start pl-3.5">
                      <MessageSquare className="h-4 w-4" style={{ color: COLORS.textLight }} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your goals — more traffic, better conversions, brand awareness…"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-none border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none resize-none focus:border-[hsl(187,94%,43%)] focus:ring-1 focus:ring-[hsl(187,94%,43%)]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 rounded-none border-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send My Free Consultation Request
                        <Send className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-zinc-100">
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full p-1" style={{ backgroundColor: "hsl(160 64% 52% / 0.1)" }}>
                      <Check className="h-3.5 w-3.5" style={{ color: COLORS.secondary }} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">No long-term contracts</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full p-1" style={{ backgroundColor: "hsl(160 64% 52% / 0.1)" }}>
                      <Check className="h-3.5 w-3.5" style={{ color: COLORS.secondary }} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">Free strategy session</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full p-1" style={{ backgroundColor: "hsl(160 64% 52% / 0.1)" }}>
                      <Check className="h-3.5 w-3.5" style={{ color: COLORS.secondary }} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">Response within 24h</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
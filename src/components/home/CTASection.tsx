import React, { useRef, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Send, User, Mail, Phone, Building2, Globe, MessageSquare } from "lucide-react";
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

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
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
          const el = containerRef.current;
          if (!el) return;
          const { left, top, width, height } = el.getBoundingClientRect();
          const mx = e?.x ?? lastPosition.current.x;
          const my = e?.y ?? lastPosition.current.y;
          if (e) lastPosition.current = { x: mx, y: my };

          const cx = left + width * 0.5, cy = top + height * 0.5;
          const dist = Math.hypot(mx - cx, my - cy);
          const inR = 0.5 * Math.min(width, height) * inactiveZone;

          if (dist < inR) { el.style.setProperty("--active", "0"); return; }

          const isActive = mx > left - proximity && mx < left + width + proximity && my > top - proximity && my < top + height + proximity;
          el.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const cur = parseFloat(el.style.getPropertyValue("--start")) || 0;
          let target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
          const diff = ((target - cur + 180) % 360) - 180;

          animate(cur, cur + diff, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => el.style.setProperty("--start", String(v)),
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const onScroll = () => handleMove();
      const onPointer = (e: PointerEvent) => handleMove(e as any);
      window.addEventListener("scroll", onScroll, { passive: true } as any);
      document.body.addEventListener("pointermove", onPointer, { passive: true } as any);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", onScroll);
        document.body.removeEventListener("pointermove", onPointer);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div className={cn("pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity", glow && "opacity-100", variant === "white" && "border-white", disabled && "!block")} />
        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`, "--spread": spread, "--start": "0", "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`, "--repeating-conic-gradient-times": "5",
            "--gradient": `radial-gradient(circle, ${COLORS.cyan} 10%, ${COLORS.cyan}00 20%),
              radial-gradient(circle at 40% 40%, ${COLORS.cyan} 5%, ${COLORS.cyan}00 15%),
              radial-gradient(circle at 60% 60%, ${COLORS.emerald} 10%, ${COLORS.emerald}00 20%),
              radial-gradient(circle at 40% 60%, ${COLORS.emerald} 10%, ${COLORS.emerald}00 20%),
              repeating-conic-gradient(from 236.84deg at 50% 50%, ${COLORS.cyan} 0%, ${COLORS.cyan} calc(25% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(50% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(75% / var(--repeating-conic-gradient-times)), ${COLORS.cyan} calc(100% / var(--repeating-conic-gradient-times)))`,
          } as React.CSSProperties}
          className={cn("pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity", glow && "opacity-100", blur > 0 && "blur-[var(--blur)]", className, disabled && "!hidden")}
        >
          <div className={cn("glow", "rounded-[inherit]", 'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]', "after:[border:var(--glowingeffect-border-width)_solid_transparent]", "after:[background:var(--gradient)] after:[background-attachment:fixed]", "after:opacity-[var(--active)] after:transition-opacity after:duration-300", "after:[mask-clip:padding-box,border-box]", "after:[mask-composite:intersect]", "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]")} />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

const FormInput = ({ icon: Icon, label, name, type = "text", placeholder, required = false, value, onChange }: {
  icon: React.ElementType; label: string; name: string; type?: string; placeholder: string; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-zinc-300 mb-1 text-left">
      {label} {required && <span style={{ color: COLORS.cyan }}>*</span>}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-4 w-4 text-zinc-500" />
      </div>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-200 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
      />
    </div>
  </div>
);

const CTASection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", url: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="relative bg-[#FAFAFA] py-16 sm:py-20 overflow-hidden">
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative group">

          <div className="absolute -inset-[1px] rounded-2xl">
            <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="section-title mb-3 text-white">
                Ready to grow your{" "}
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                  className="inline-block"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${COLORS.cyan}, ${COLORS.cyan}, ${COLORS.emerald}, ${COLORS.emerald}, rgba(255,255,255,0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  business today?
                </motion.span>
              </h2>

              <p className="section-text-dark max-w-lg mx-auto">
                Tell us about your project and we'll get back to you within 24 hours with a free tailored strategy.
              </p>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-10">
                <div className="rounded-full p-3" style={{ backgroundColor: "rgba(52, 211, 153, 0.1)" }}>
                  <Check className="h-8 w-8" style={{ color: COLORS.emerald }} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-zinc-400 max-w-md text-center">Thanks for reaching out. One of our strategists will review your details and contact you shortly.</p>
              </motion.div>
            ) : (
              /* Form */
              <div className="space-y-4">
                {/* Row 1: Name, Email, Phone */}
                <div className="grid md:grid-cols-3 gap-4">
                  <FormInput icon={User} label="Full Name" name="name" placeholder="John Smith" required value={formData.name} onChange={handleChange} />
                  <FormInput icon={Mail} label="Email Address" name="email" type="email" placeholder="john@company.com" required value={formData.email} onChange={handleChange} />
                  <FormInput icon={Phone} label="Phone Number" name="phone" type="tel" placeholder="+61 400 000 000" value={formData.phone} onChange={handleChange} />
                </div>

                {/* Row 2: Company & URL */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput icon={Building2} label="Company Name" name="company" placeholder="Acme Pty Ltd" value={formData.company} onChange={handleChange} />
                  <FormInput icon={Globe} label="Website URL" name="url" type="url" placeholder="https://yourwebsite.com.au" value={formData.url} onChange={handleChange} />
                </div>

                {/* Row 3: Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 mb-1 text-left">
                    How can we help? <span style={{ color: COLORS.cyan }}>*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute top-3 left-0 flex items-start pl-3">
                      <MessageSquare className="h-4 w-4 text-zinc-500" />
                    </div>
                    <textarea
                      id="message" name="message" required rows={3}
                      placeholder="Tell us about your goals — more traffic, better conversions, brand awareness…"
                      value={formData.message} onChange={handleChange}
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-200 outline-none resize-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]"
                    />
                  </div>
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="text-sm text-red-400 text-center">
                    Something went wrong. Please try again or email us directly at info@clientconnectaustralia.com
                  </p>
                )}

                {/* Submit + Trust in a row */}
                <div className="flex flex-col lg:flex-row items-center gap-5 pt-2">
                  <Button
                    size="lg" onClick={handleSubmit} disabled={isSubmitting}
                    className="w-full lg:w-auto h-12 px-10 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 rounded-lg border-0 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                    style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.emerald})` }}
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
                        Send Consultation Request
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {["No long-term contracts", "Free strategy session", "Response within 24h"].map((text) => (
                      <div key={text} className="flex items-center gap-1.5">
                        <div className="rounded-full p-0.5" style={{ backgroundColor: "rgba(52, 211, 153, 0.15)" }}>
                          <Check className="h-3 w-3" style={{ color: COLORS.emerald }} strokeWidth={3} />
                        </div>
                        <span className="text-xs font-medium text-zinc-400">{text}</span>
                      </div>
                    ))}
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
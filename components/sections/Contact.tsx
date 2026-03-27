"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientButton } from "@/components/ui/GradientButton";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    window.location.href = `mailto:devthierry@pm.me?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    reset();
  };

  const inputClass =
    "w-full bg-[#131820] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 font-sans text-sm text-[#FFFFFF] placeholder-[#4a5568] focus:outline-none focus:border-[rgba(57,255,20,0.3)] transition-colors duration-200";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0F1219]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label="Let's Build"
          title="Get in Touch"
          subtitle="Have a project in mind? Let's discuss how I can help."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-mono text-lg font-semibold text-[#FFFFFF] mb-2">
                Direct Contact
              </h3>
              <p className="text-[#8892a4] text-sm leading-relaxed">
                I&apos;m selective with projects — I take on work that challenges me
                and creates real impact. If that sounds like you, reach out.
              </p>
            </div>

            {[
              {
                label: "Email",
                value: "devthierry@pm.me",
                href: "mailto:devthierry@pm.me",
                icon: "✉",
                color: "#39FF14",
              },
              {
                label: "Phone",
                value: "+33 6 46 89 93 10",
                href: "tel:+33646899310",
                icon: "✆",
                color: "#FF007F",
              },
              {
                label: "Location",
                value: "On-web. On-chain.",
                href: undefined,
                icon: "⬡",
                color: "#00D1FF",
              },
            ].map(({ label, value, href, icon, color }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: `${color}25`,
                    backgroundColor: `${color}0d`,
                    color,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-widest uppercase text-[#4a5568] mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-mono text-sm text-[#FFFFFF] hover:text-[#39FF14] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm text-[#FFFFFF]">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {sent && (
              <div className="bg-[rgba(0,209,255,0.08)] border border-[rgba(0,209,255,0.25)] rounded-xl px-4 py-3 font-mono text-sm text-[#00D1FF]">
                Message ready — your email client should open.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input {...register("name")} placeholder="Name" className={inputClass} />
                {errors.name && (
                  <p className="font-mono text-xs text-red-400 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input {...register("email")} placeholder="Email" className={inputClass} />
                {errors.email && (
                  <p className="font-mono text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <input {...register("subject")} placeholder="Subject" className={inputClass} />
              {errors.subject && (
                <p className="font-mono text-xs text-red-400 mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message")}
                placeholder="Tell me about your project..."
                rows={5}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className="font-mono text-xs text-red-400 mt-1">{errors.message.message}</p>
              )}
            </div>

            <GradientButton variant="primary" onClick={() => {}}>
              {isSubmitting ? "Opening..." : "Send Message →"}
            </GradientButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

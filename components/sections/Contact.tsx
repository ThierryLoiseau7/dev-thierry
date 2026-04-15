"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    "w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#aaaaaa] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors duration-200 font-work";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label="Let's Build"
          title="Start a Project"
          subtitle="Have a project in mind? Let's discuss how I can help."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-[#1a1a1a] mb-2">
                Direct Contact
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed font-work">
                I&apos;m selective with projects — I take on work that challenges me
                and creates real impact. If that sounds like you, reach out.
              </p>
            </div>

            {[
              {
                label: "Email",
                value: "devthierry@pm.me",
                href: "mailto:devthierry@pm.me",
                color: "#16a34a",
              },
              {
                label: "Phone",
                value: "+33 6 46 89 93 10",
                href: "tel:+33646899310",
                color: "#7c3aed",
              },
              {
                label: "Availability",
                value: "Remote Worldwide",
                href: undefined,
                color: "#0284c7",
              },
            ].map(({ label, value, href, color }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    borderColor: `${color}20`,
                    backgroundColor: `${color}06`,
                    color,
                  }}
                >
                  {label[0]}
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#aaaaaa] mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-[#1a1a1a] hover:text-[#555555] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-[#1a1a1a]">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {sent && (
              <div className="bg-[rgba(22,163,74,0.06)] border border-[rgba(22,163,74,0.2)] rounded-xl px-4 py-3 text-sm text-[#16a34a] font-medium">
                Message ready — your email client should open.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input {...register("name")} placeholder="Full Name" className={inputClass} />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input {...register("email")} placeholder="Business Email" className={inputClass} />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <input {...register("subject")} placeholder="Project Subject" className={inputClass} />
              {errors.subject && (
                <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
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
                <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#1a1a1a] text-white font-medium text-sm hover:bg-[#333333] transition-colors duration-200 disabled:opacity-60"
            >
              {isSubmitting ? "Opening..." : "Send Message →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

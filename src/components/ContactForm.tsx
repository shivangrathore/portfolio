import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_FORM_URL, CONTACT_FORM_FIELDS } from "@/lib/constants";
import { buttonClass } from "@/lib/button";

const PROJECT_TYPES = [
  "Idea to MVP",
  "Go backend development",
  "Node to Go migration",
  "Full-stack product build",
  "Real-time or event systems",
  "Architecture review",
  "Something else",
] as const;

const BUDGETS = [
  "Under $2k",
  "$2k to $5k",
  "$5k to $15k",
  "$15k+",
  "Not sure yet",
] as const;

const TIMELINES = [
  "Ready to start now",
  "Within a month",
  "In the next quarter",
  "Just exploring",
] as const;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  // Optional on purpose: a recruiter, or anyone with a plain question, must be
  // able to send a message without inventing a budget.
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

const field =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const labelCls = "mb-2 block text-sm font-medium text-muted";
const errorCls = "mt-1 text-xs text-red-400";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    // The linked Google Form only has four fields, so the qualifying answers
    // ride along at the top of the message rather than needing new entry ids.
    // Blank answers are left out entirely instead of arriving as empty labels.
    const answered = [
      data.projectType && `Project type: ${data.projectType}`,
      data.budget && `Budget: ${data.budget}`,
      data.timeline && `Timeline: ${data.timeline}`,
    ].filter(Boolean);
    const body = answered.length
      ? [...answered, "", data.message].join("\n")
      : data.message;
    const formData = new FormData();
    formData.append(CONTACT_FORM_FIELDS.name, data.name);
    formData.append(CONTACT_FORM_FIELDS.email, data.email);
    formData.append(CONTACT_FORM_FIELDS.subject, data.subject);
    formData.append(CONTACT_FORM_FIELDS.message, body);
    try {
      await fetch(CONTACT_FORM_URL, {
        body: formData,
        method: "POST",
        mode: "no-cors",
      });
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Name
          </label>
          <input id="name" className={field} placeholder="Your name" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={field}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          className={field}
          placeholder="What's this about?"
          {...register("subject")}
        />
        {errors.subject && <p className={errorCls}>{errors.subject.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="projectType">
            Project type <span className="text-faint">(optional)</span>
          </label>
          <select id="projectType" className={field} {...register("projectType")}>
            <option value="">No answer</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budget">
            Budget <span className="text-faint">(optional)</span>
          </label>
          <select id="budget" className={field} {...register("budget")}>
            <option value="">No answer</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="timeline">
            Timeline <span className="text-faint">(optional)</span>
          </label>
          <select id="timeline" className={field} {...register("timeline")}>
            <option value="">No answer</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className={field}
          placeholder="The problem you are solving, what exists today, and what done looks like."
          {...register("message")}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClass("primary", "w-full py-3 disabled:opacity-60")}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="size-4" />
            Send message
          </>
        )}
      </button>

      {status === "ok" && (
        <p className="text-sm text-accent">
          Sent. I'll come back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please email me directly.</p>
      )}
    </form>
  );
}

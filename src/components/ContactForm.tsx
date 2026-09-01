import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_FORM_URL, CONTACT_FORM_FIELDS } from "@/lib/constants";
import { buttonClass } from "@/lib/button";
import { track } from "@/lib/analytics";

const PROJECT_TYPES = [
  "AI engineering",
  "Backend performance and optimization",
  "Go backend development",
  "Idea to MVP",
  "Full-stack product build",
  "Node to Go migration",
  "Real-time or event systems",
  "Architecture review",
  "Something else",
] as const;

// Bands start where the published service floors start, so the form does not
// invite a budget the services page has already ruled out. Two sets, matching
// the two rate cards: offering a US visitor lakh bands, or an Indian one a
// $20k+ option, wastes the question.
const BUDGETS = {
  intl: [
    "Under $2k",
    "$2k to $5k",
    "$5k to $10k",
    "$10k+",
    "Not sure yet",
  ],
  in: [
    "Under ₹50,000",
    "₹50,000 to ₹1,00,000",
    "₹1,00,000 to ₹2,50,000",
    "₹2,50,000+",
    "Not sure yet",
  ],
} as const;

/**
 * The rate card the visitor is on, read from the attribute the head script
 * already set. It starts at "intl" because that is what the server rendered
 * and a mismatch on first paint is a hydration error; the effect corrects it
 * immediately after. The observer keeps it honest when someone flips the
 * footer toggle with the form already on screen.
 */
function useRegion(): "in" | "intl" {
  const [region, setRegion] = useState<"in" | "intl">("intl");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setRegion(root.dataset.region === "in" ? "in" : "intl");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-region"] });
    return () => observer.disconnect();
  }, []);

  return region;
}

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
  "w-full rounded-md border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const labelCls = "mb-2 block text-sm font-medium text-fg";
const errorCls = "mt-1.5 text-xs text-danger";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const region = useRegion();
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
    // Each qualifying answer now has its own question on the form, so they
    // arrive as their own columns and leads can be sorted by budget rather
    // than read one message at a time.
    const formData = new FormData();
    formData.append(CONTACT_FORM_FIELDS.name, data.name);
    formData.append(CONTACT_FORM_FIELDS.email, data.email);
    formData.append(CONTACT_FORM_FIELDS.subject, data.subject);
    formData.append(CONTACT_FORM_FIELDS.message, data.message);
    formData.append(CONTACT_FORM_FIELDS.projectType, data.projectType);
    formData.append(CONTACT_FORM_FIELDS.budget, data.budget);
    formData.append(CONTACT_FORM_FIELDS.timeline, data.timeline);
    try {
      await fetch(CONTACT_FORM_URL, {
        body: formData,
        method: "POST",
        mode: "no-cors",
      });
      setStatus("ok");
      // The qualifying answers ride along so GA4 can separate a $15k+ enquiry
      // from someone just exploring. No name, email or message is ever sent.
      track("generate_lead", {
        project_type: data.projectType || "unanswered",
        budget: data.budget || "unanswered",
        timeline: data.timeline || "unanswered",
        // Overrides the sitewide value in `track`, which reads the same
        // attribute: kept explicit here so a lead is never attributed to the
        // wrong rate card if the toggle is flipped between submit and send.
        region,
      });
      reset();
    } catch {
      setStatus("error");
      track("form_error", { form: "contact" });
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
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
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
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
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
            {BUDGETS[region].map((b) => (
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
        <p className="text-sm text-danger">Something went wrong. Please email me directly.</p>
      )}
    </form>
  );
}

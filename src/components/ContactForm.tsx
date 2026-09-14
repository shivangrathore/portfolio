import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import {
  CONTACT_FORM_URL,
  CONTACT_FORM_FIELDS,
  WEB3FORMS_URL,
  WEB3FORMS_ACCESS_KEY,
  MAIL_ADDRESS,
} from "@/lib/constants";
import { buttonClass } from "@/lib/button";
import { SelectField } from "@/components/SelectField";
import { track } from "@/lib/analytics";

/**
 * The project-type options are passed in by the page rather than listed here.
 *
 * They used to be a second hardcoded copy of the service names, and they drifted:
 * the form was still offering "Go backend development" months after that service
 * was renamed, and "Real-time or event systems" against "Real-time and event
 * systems" on /services. Deriving them server-side means the island ships only
 * the strings, not the whole services module, and the two can never disagree.
 */
interface Props {
  projectTypes: string[];
}

// Bands start where the published service floors start, so the form does not
// invite a budget the services page has already ruled out. Two sets, matching
// the two rate cards: offering a US visitor lakh bands, or an Indian one a
// $20k+ option, wastes the question.
const BUDGETS = {
  intl: [
    "Under $500",
    "$500 to $1,500",
    "$1,500 to $4,000",
    "$4,000+",
    "Not sure yet",
  ],
  in: [
    "Under ₹10,000",
    "₹10,000 to ₹30,000",
    "₹30,000 to ₹75,000",
    "₹75,000+",
    "Not sure yet",
  ],
} as const;

/**
 * The rate card the visitor is on, read from the attribute the head script
 * already set. It starts at "in" because that is what the server rendered and a
 * mismatch on first paint is a hydration error; the effect corrects it
 * immediately after. The observer keeps it honest when someone flips the footer
 * toggle with the form already on screen.
 */
function useRegion(): "in" | "intl" {
  const [region, setRegion] = useState<"in" | "intl">("in");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setRegion(root.dataset.region === "intl" ? "intl" : "in");
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
  // Optional on purpose: a recruiter, or anyone with a plain question, must be
  // able to send a message without inventing a budget.
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().min(1, "Message is required"),
  // Honeypot. Hidden from people, irresistible to the bots that scrape a public
  // Google Forms endpoint. Anything in here and the submit is dropped on the
  // floor while still reporting success, because telling a bot it failed only
  // teaches it to try again.
  botcheck: z.string().max(0).optional().or(z.literal("")),
});

/**
 * The Google Form requires a Subject, so one is always sent. It used to be a
 * field the visitor filled in, which is a required question that costs a lead
 * and earns nothing: the message says what it is about, and "Subject" is the
 * kind of box that makes a founder close the tab and think about it later.
 *
 * Dropping it from the form entirely was not an option. A required Google Form
 * question that arrives empty makes Google reject the whole submission, and a
 * no-cors POST cannot see the rejection, so the visitor would read "Sent" while
 * the lead went nowhere.
 */
function deriveSubject(data: { projectType?: string; message?: string }) {
  if (data.projectType) return data.projectType;
  const firstLine = (data.message ?? "").trim().split("\n")[0] ?? "";
  return firstLine.length > 70 ? `${firstLine.slice(0, 67)}...` : firstLine || "New enquiry";
}

type FormValues = z.infer<typeof schema>;

const field =
  "w-full border border-border bg-bg px-3.5 py-3 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const labelCls = "mb-2 block text-sm font-medium text-fg";
const errorCls = "mt-1.5 text-xs text-danger";


export default function ContactForm({ projectTypes }: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const region = useRegion();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      botcheck: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    // Honeypot tripped: report success, send nothing.
    if (data.botcheck) {
      setStatus("ok");
      reset();
      return;
    }
    const subject = deriveSubject(data);

    // Mirror to the Google Form, so the responses spreadsheet keeps filling.
    // Deliberately not awaited and deliberately not allowed to throw: this is a
    // bookkeeping copy, and whether it lands must never change what the visitor
    // is told. Web3Forms below is the one that decides that.
    const mirrorToSheet = () => {
      const formData = new FormData();
      formData.append(CONTACT_FORM_FIELDS.name, data.name);
      formData.append(CONTACT_FORM_FIELDS.email, data.email);
      formData.append(CONTACT_FORM_FIELDS.subject, subject);
      formData.append(CONTACT_FORM_FIELDS.message, data.message);
      formData.append(CONTACT_FORM_FIELDS.projectType, data.projectType);
      formData.append(CONTACT_FORM_FIELDS.budget, data.budget);
      formData.append(CONTACT_FORM_FIELDS.timeline, data.timeline);
      fetch(CONTACT_FORM_URL, {
        body: formData,
        method: "POST",
        mode: "no-cors",
      }).catch(() => {
        /* the sheet copy is best effort */
      });
    };

    try {
      // Web3Forms answers with CORS headers and a JSON body, so unlike the
      // Google Forms post this one can actually be checked. A rejected
      // submission now shows an error instead of a confirmation.
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Enquiry: ${subject}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          message: data.message,
          "Project type": data.projectType || "Not answered",
          Budget: data.budget || "Not answered",
          Timeline: data.timeline || "Not answered",
          "Rate card": region === "in" ? "India (INR)" : "International (USD)",
          // Web3Forms' own honeypot convention, alongside the client-side check
          // above. Belt and braces costs one field.
          botcheck: "",
        }),
      });

      const body = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!res.ok || !body?.success) {
        throw new Error(body?.message ?? `submit failed (${res.status})`);
      }

      mirrorToSheet();
      setStatus("ok");
      // The qualifying answers ride along so GA4 can separate a serious budget
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
    <form
      // The action and method are the no-JS path, and they are not decoration.
      // When this island failed to hydrate during testing the browser fell back
      // to a native GET against the current page: the submission was lost and
      // the visitor's message ended up in the URL bar. With these set, the same
      // failure posts straight to Web3Forms and the lead still arrives.
      action={WEB3FORMS_URL}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-6"
    >
      {/* Only read by the native fallback. The JS path sends its own copy in
          the JSON body. */}
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input
        type="hidden"
        name="subject"
        value="New enquiry from shivangrathore.com"
      />
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
        <label className={labelCls} htmlFor="message">
          What do you need built?
        </label>
        <textarea
          id="message"
          rows={6}
          className={field}
          placeholder="The problem you are solving, what exists today, and what done looks like. A paragraph is plenty."
          {...register("message")}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      {/* Honeypot. Positioned off-screen rather than display:none, because some
          bots skip hidden inputs but not ones that are merely out of view. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="botcheck">Website</label>
        <input
          id="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("botcheck")}
        />
      </div>

      {/* Everything below is optional and says so. These three used to sit
          above the message, which put three dropdowns between a visitor and the
          only box that matters. */}
      <div className="border-t border-line pt-6">
        <p className="text-sm text-faint">
          Optional, and useful if you already know. Skip any of them.
        </p>
      </div>

      {/* Project type gets the full row. Its options are the longest strings
          on the form and a third of the column is not enough to show them. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <SelectField
            control={control}
            name="projectType"
            label="Project type"
            options={projectTypes}
          />
        </div>
        <SelectField
          control={control}
          name="budget"
          label="Budget"
          options={BUDGETS[region]}
        />
        <SelectField
          control={control}
          name="timeline"
          label="Timeline"
          options={TIMELINES}
        />
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

      {/*
        These two messages are now load-bearing. Until the endpoint could report
        failure, "Sent" was printed unconditionally and a rejected submission
        looked identical to an accepted one, which is the worst possible failure
        mode for the one form on the site that exists to capture leads.
      */}
      {status === "ok" && (
        <p className="text-sm text-accent">
          Sent. I'll come back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-danger">
          That didn't send. Nothing reached me, so please email{" "}
          <a
            href={`mailto:${MAIL_ADDRESS}`}
            className="underline underline-offset-4"
          >
            {MAIL_ADDRESS}
          </a>{" "}
          directly and I'll pick it up from there.
        </p>
      )}
    </form>
  );
}

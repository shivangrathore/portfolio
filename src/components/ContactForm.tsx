import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_FORM_URL, CONTACT_FORM_FIELDS } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

const field =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const labelCls = "mb-2 block text-sm font-medium text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    const formData = new FormData();
    formData.append(CONTACT_FORM_FIELDS.name, data.name);
    formData.append(CONTACT_FORM_FIELDS.email, data.email);
    formData.append(CONTACT_FORM_FIELDS.subject, data.subject);
    formData.append(CONTACT_FORM_FIELDS.message, data.message);
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
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className={field}
          placeholder="Tell me about your project, idea, or just say hello..."
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
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
        <p className="text-sm text-accent">Message sent. Thanks, I'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please email me directly.</p>
      )}
    </form>
  );
}

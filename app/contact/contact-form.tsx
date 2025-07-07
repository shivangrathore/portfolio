"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONTACT_FORM_URL, CONTACT_FORM_FIELDS } from "@/data/constants";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Subject is required"),
});

type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
  });
  const onSubmit = async (data: ContactFormSchemaType) => {
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
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      return;
    }
    toast.success("Message sent successfully!");
    form.reset();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send me a message</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} required placeholder="Your name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        required
                        placeholder="youremail@xyz.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="subject"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder="Subject of your message"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      required
                      rows={5}
                      placeholder="Tell me about your project, idea, or just say hello..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

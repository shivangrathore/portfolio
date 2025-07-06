"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  CONTACT_FORM_EMAIL_FIELD,
  CONTACT_FORM_MESSAGE_FIELD,
  CONTACT_FORM_NAME_FIELD,
  CONTACT_FORM_URL,
  MAIL_ADDRESS,
} from "@/data/constants";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Github from "@/assets/icons/github.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import { Form, FormField, FormItem } from "@/components/ui/form";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;

export default function Contact() {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormSchemaType) => {
    const formData = new FormData();
    formData.append(CONTACT_FORM_NAME_FIELD, data.name);
    formData.append(CONTACT_FORM_EMAIL_FIELD, data.email);
    formData.append(CONTACT_FORM_MESSAGE_FIELD, data.message);

    const res = await fetch(CONTACT_FORM_URL, {
      body: formData,
      method: "POST",
      mode: "no-cors",
    });
    console.log(res.status);
    toast.success("Message sent successfully!");
    form.reset();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in hearing about new opportunities,
            collaborations, or just having a conversation about technology. Feel
            free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-in">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                <p className="text-muted-foreground text-lg">
                  I'm open to discussing new projects, job opportunities, or any
                  interesting conversations about web development, system
                  programming, or Linux.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${MAIL_ADDRESS}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {MAIL_ADDRESS}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      Available for remote work
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Connect on Social
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/shivangrathore"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://linkedin.com/in/shivangrathore"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>

              {/* What I'm Looking For */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What I'm Looking For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      Full-time or contract development opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      Open source collaboration projects
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      Mentorship opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      Technical discussions and knowledge sharing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              {...field}
                              required
                              placeholder="Your name"
                            />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              {...field}
                              required
                              placeholder="youremail@xyz.com"
                            />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="message"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            {...field}
                            required
                            rows={5}
                            placeholder="Tell me about your project, idea, or just say hello..."
                          />
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

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Prefer email? Reach me directly at{" "}
                <Link
                  href={`mailto:${MAIL_ADDRESS}`}
                  className="text-primary hover:underline"
                >
                  {MAIL_ADDRESS}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

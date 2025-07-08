import { Button } from "@/components/ui/button";
import { getBlog, getBlogs } from "../utils";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getBlog(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://yourdomain.com/blog/${slug}`,
    },
    twitter: {
      card: "summary",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, frontmatter } = await getBlog(slug);
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Navigation */}
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <article className="animate-slide-up">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {frontmatter.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {frontmatter.pubDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {frontmatter.readingTime}
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {!frontmatter.published && (
                <Badge variant="secondary" className="ml-auto">
                  Draft
                </Badge>
              )}
              <div></div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Content */}
        </article>
        <div className="prose prose-invert max-w-none">{content}</div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export const dynamicParams = false;

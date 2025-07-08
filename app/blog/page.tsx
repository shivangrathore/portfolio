import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "./utils";

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts and insights on web development, system programming, Linux,
            and my journey with Go and Rust.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts available at the moment. Please check back later!
              </p>
            </div>
          ) : (
            blogs.map((post, index) => (
              <Card
                key={post.slug}
                className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="">
                  {/* Date */}
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.pubDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.description}
                  </p>

                  {/* Tags and Read More */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 min-w-0 flex-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="shrink-0"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

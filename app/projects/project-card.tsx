import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "./utils";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Github from "@/assets/icons/github.svg";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-base">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            {project.github && (
              <Button size="sm" variant="ghost" asChild>
                <Link href={project.github} aria-label="View on GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" variant="ghost" asChild>
                <Link href={project.demo} aria-label="View live demo">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>{" "}
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {project.date}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

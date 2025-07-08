"use client";
import { Masonry } from "react-plock";
import { Project } from "./utils";
import ProjectCard from "./project-card";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <Masonry
      items={projects}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [768, 1024, 1440],
        useBalancedLayout: true,
      }}
      render={(item, idx) => <ProjectCard project={item} key={idx} />}
    />
  );
}

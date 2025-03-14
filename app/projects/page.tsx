import { ProjectList } from "@/app/projects/components/project-list";
import { SearchHeader } from "@/app/projects/components/search-header";
import { Project } from "../typs/project";
import Header from "@/components/header"


const projects: Project[] = [
  {
    id: 1,
    name: "E-commerce Redesign",
    description: "Mobile-first shopping experience",
    status: "in-review",
    type: "Mobile App",
    lastUpdate: "1 hours ago",
  },
  {
    id: 2,
    name: "سلام",
    description: "Design system for analytics platform",
    status: "in-progress",
    type: "Design System",
    lastUpdate: "5 hours ago",
  },
  {
    id: 3,
    name: "Landing Page",
    description: "Marketing website redesign",
    status: "completed",
    type: "Website",
    lastUpdate: "1 day ago",
  },
  {
    id: 4,
    name: "pwedaret",
    description: "1",
    status: "completed",
    type: "mamanet",
    lastUpdate: "3 min",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <Header/>
    <div className="container mx-auto p-6 space-y-8 py-24">
      
      <SearchHeader />
      <ProjectList projects={projects} />
    </div>
    </div>
    
  );
}

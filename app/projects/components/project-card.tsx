import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, Layers } from "lucide-react";
import { Project } from "@/app/typs/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    //${project.id} in baed kanban payin neveshte mishe
    <Link href={`/kanban`}>
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            
            <Button variant="ghost" className="h-8 p-2" asChild>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                <span className="text-sm">{project.type}</span>
              </div>
            </Button>
              
            <Badge
              variant={
                project.status === "completed"
                  ? "default"
                  : project.status === "in-progress"
                  ? "secondary"
                  : "default"
              }
            >
              {project.status === "completed"
                ? "Completed"
                : project.status === "in-progress"
                ? "In Progress"
                : "In Review"}
            </Badge>
          </div>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Layers className="h-4 w-4" />
            <span className="text-sm">به روز رسانی {project.lastUpdate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

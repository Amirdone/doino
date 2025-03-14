"use client"

import { useDrag } from "react-dnd"
import { useRef } from "react"
import type { Task as TaskType } from "./kanban-board"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TaskProps {
  task: TaskType
  onEdit: () => void
  onDelete: () => void
}

export default function Task({ task, onEdit, onDelete }: TaskProps) {
  const ref = useRef<HTMLDivElement>(null) // استفاده از `useRef` برای مدیریت `ref`

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref) // اتصال `drag` به `ref`

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  return (
    <Card ref={ref} className={cn("cursor-grab", isDragging && "opacity-50")}>
      <CardContent className="p-3">
        <div className="mb-2">
          <h3 className="font-medium">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={priorityColors[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {task.dueDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Task actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              ویرایش
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
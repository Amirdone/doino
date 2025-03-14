"use client";

import { useState, useRef } from "react";
import { useDrop, useDrag, type DropTargetMonitor } from "react-dnd";
import type { Column as ColumnType, Task as TaskType } from "./kanban-board";
import Task from "./task";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, MoreVertical, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// -------------------
// نوع‌هایی که نیاز داریم
// -------------------
interface ColumnProps {
  column: ColumnType;
  index: number;
  tasks: TaskType[];
  onEditColumn: (columnId: string, newTitle: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: () => void;
  moveTask: (taskId: string, targetColumnId: string) => void;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function Column({
  column,
  index,
  tasks,
  onEditColumn,
  onDeleteColumn,
  onEditTask,
  onDeleteTask,
  onAddTask,
  moveTask,
  moveColumn,
}: ColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const ref = useRef<HTMLDivElement>(null);
  const dropInnerRef = useRef<HTMLDivElement>(null);

  // --------------------
  // 1) دراپ تسک‌ها در ستون
  // --------------------
  // collectedProps: { isTaskOver: boolean }
  const [{ isTaskOver }, dropInner] = useDrop<
    { id: string },       // نوع آیتم دریافتی (برای تسک)
    void,                 // خروجی drop (نیاز نداریم)
    { isTaskOver: boolean } // collect props
  >({
    accept: ["task"],
    drop: (item) => moveTask(item.id, column.id),
    collect: (monitor) => ({
      isTaskOver: monitor.isOver(),
    }),
  });

  dropInner(dropInnerRef);

  // --------------------
  // 2) درگ شدن ستون
  // --------------------
  // collectedProps: { isDragging: boolean }
  const [{ isDragging }, drag] = useDrag<
    { id: string; index: number }, // نوع آیتمی که درگ می‌شود
    void,                          // خروجی drop (نیاز نداریم)
    { isDragging: boolean }        // collect props
  >({
    type: "column",
    item: () => ({ id: column.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // --------------------
  // 3) دراپ شدن ستون کنار ستون‌های دیگر
  // --------------------
  // collectedProps: { isColumnOver: boolean; canDrop: boolean }
  const [{ isColumnOver, canDrop }, drop] = useDrop<
    DragItem, // نوع آیتمی که درگ می‌شود
    void,     // خروجی drop
    { isColumnOver: boolean; canDrop: boolean }
  >({
    accept: ["column"],
    collect: (monitor) => ({
      isColumnOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // ستون را همزمان قابل دراپ (drop) و درگ (drag) می‌کنیم
  drag(drop(ref));

  // --------------------
  // متدهای مربوط به ویرایش عنوان ستون
  // --------------------
  const handleSave = () => {
    if (title.trim()) {
      onEditColumn(column.id, title);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(column.title);
    setIsEditing(false);
  };

  // --------------------
  // JSX
  // --------------------
  return (
    <Card
      ref={ref}
      className={cn(
        "w-80 flex-shrink-0 flex flex-col",
        // وقتی تسک را روی ستون می‌کشیم
        isTaskOver && "border-primary border-2",
        // وقتی خود ستون درگ می‌شود
        isDragging && "opacity-50",
        "cursor-grab"
      )}
    >
      <CardHeader className="pb-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="flex-1"
            />
            <Button size="icon" variant="ghost" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <CardTitle>{column.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">تغییرات لیست</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  ویرایش
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteColumn(column.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  حذف کردن
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardHeader>
      <CardContent ref={dropInnerRef} className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
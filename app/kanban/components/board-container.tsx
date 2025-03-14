"use client";

import { useRef } from "react";
import { useDrop } from "react-dnd";
import type { Column, Task } from "./kanban-board";
import ColumnComponent from "./column";

interface BoardContainerProps {
  columns: Column[];
  tasks: Task[];
  onEditColumn: (columnId: string, newTitle: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
  moveTask: (taskId: string, targetColumnId: string) => void;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

export default function BoardContainer({
  columns,
  tasks,
  onEditColumn,
  onDeleteColumn,
  onEditTask,
  onDeleteTask,
  onAddTask,
  moveTask,
  moveColumn,
}: BoardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "column",
    drop: () => ({ name: "BoardContainer" }),
  });

  drop(ref);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4" ref={ref}>
      {columns.map((column, index) => (
        <ColumnComponent
          key={column.id}
          column={column}
          index={index}
          tasks={tasks.filter((task) => task.columnId === column.id)}
          onEditColumn={onEditColumn}
          onDeleteColumn={onDeleteColumn}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onAddTask={() => onAddTask(column.id)}
          moveTask={moveTask}
          moveColumn={moveColumn}
        />
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardContainer from "./board-container";
import AddColumnForm from "./add-column-form";
import TaskForm from "./task-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  isDefault: boolean;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: "todo", title: "To Do", isDefault: false },
  { id: "inprogress", title: "In Progress", isDefault: false },
  { id: "done", title: "Done", isDefault: false },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [targetColumnId, setTargetColumnId] = useState<string>("todo");
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedColumns = localStorage.getItem("kanban-columns");
    const savedTasks = localStorage.getItem("kanban-tasks");

    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      // Ensure default columns are always present
      const mergedColumns = [...DEFAULT_COLUMNS];

      parsedColumns.forEach((column: Column) => {
        if (
          !DEFAULT_COLUMNS.some((defaultCol) => defaultCol.id === column.id)
        ) {
          mergedColumns.push(column);
        }
      });

      setColumns(mergedColumns);
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [columns, tasks]);

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };

    setTasks([...tasks, newTask as Task]);
    setIsAddingTask(false);

    toast({
      title: "Task added",
      description: `"${newTask.title}" has been added to ${
        columns.find((col) => col.id === newTask.columnId)?.title
      }`,
    });
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);

    toast({
      title: "Task updated",
      description: `"${updatedTask.title}" has been updated`,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));

    toast({
      title: "Task deleted",
      description: taskToDelete
        ? `"${taskToDelete.title}" has been deleted`
        : "Task has been deleted",
    });
  };

  const handleAddColumn = (title: string) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title,
      isDefault: false,
    };

    setColumns([...columns, newColumn]);
    setIsAddingColumn(false);

    toast({
      title: "Column added",
      description: `"${title}" column has been added`,
    });
  };

  const handleEditColumn = (columnId: string, newTitle: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );

    toast({
      title: "Column updated",
      description: `Column renamed to "${newTitle}"`,
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    // Don't allow deleting if there's only one column left
    if (columns.length <= 1) {
      toast({
        title: "Cannot delete column",
        description: "You must have at least one column in the board.",
        variant: "destructive",
      });
      return;
    }

    const columnToDelete = columns.find((column) => column.id === columnId);

    // Find the first available column that's not being deleted
    const firstAvailableColumn = columns.find((col) => col.id !== columnId);
    const targetColumnId = firstAvailableColumn
      ? firstAvailableColumn.id
      : "todo";

    // Move tasks from the deleted column to the first available column
    setTasks(
      tasks.map((task) =>
        task.columnId === columnId
          ? { ...task, columnId: targetColumnId }
          : task
      )
    );

    setColumns(columns.filter((column) => column.id !== columnId));

    toast({
      title: "Column deleted",
      description: columnToDelete
        ? `"${columnToDelete.title}" column has been deleted. Tasks moved to another column.`
        : "Column has been deleted",
    });
  };

  const moveTask = (taskId: string, targetColumnId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const draggedColumn = columns[dragIndex];
    const newColumns = [...columns];
    newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, draggedColumn);
    setColumns(newColumns);
  };

  const handleAddTaskForColumn = (columnId: string) => {
    setTargetColumnId(columnId);
    setIsAddingTask(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-4 flex justify-between items-center">
        <Button
          onClick={() => {
            setTargetColumnId("todo");
            setIsAddingTask(true);
          }}
          className="flex items-center gap-1 bg-white text-black"
        >
          <PlusCircle className="mr-2 h-4 w-4"/>
          اضافه کردن تسک
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsAddingColumn(true)}
          className="flex items-center gap-1 border-green-600"
        >
          <PlusCircle className="mr-2 h-4 w-4 stroke-green-600" />
          اضاف کردن لیست
        </Button>
      </div>

      <BoardContainer
        columns={columns}
        tasks={tasks}
        onEditColumn={handleEditColumn}
        onDeleteColumn={handleDeleteColumn}
        onEditTask={(task) => setEditingTask(task)}
        onDeleteTask={handleDeleteTask}
        onAddTask={handleAddTaskForColumn}
        moveTask={moveTask}
        moveColumn={moveColumn}
      />

{isAddingTask && (
  <TaskForm
    columns={columns}
    initialColumnId={targetColumnId}
    onSubmit={(task) => handleAddTask(task as Omit<Task, "id">)}
    onCancel={() => setIsAddingTask(false)}
  />
)}

{editingTask && (
  <TaskForm
    task={editingTask}
    columns={columns}
    onSubmit={(task) => handleEditTask(task as Task)}
    onCancel={() => setEditingTask(null)}
  />
)}

      {isAddingColumn && (
        <AddColumnForm
          onSubmit={handleAddColumn}
          onCancel={() => setIsAddingColumn(false)}
        />
      )}
    </DndProvider>
  );
}

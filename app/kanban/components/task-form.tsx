"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Task, Column, Priority } from "./kanban-board"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TaskFormProps {
  task?: Task
  columns: Column[]
  initialColumnId?: string
  onSubmit: (task: Task | Omit<Task, "id">) => void
  onCancel: () => void
}

export default function TaskForm({ task, columns, initialColumnId = "todo", onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "")
  const [description, setDescription] = useState(task?.description || "")
  const [priority, setPriority] = useState<Priority>(task?.priority || "medium")
  const [dueDate, setDueDate] = useState(task?.dueDate || "")
  const [columnId, setColumnId] = useState(task?.columnId || initialColumnId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const updatedTask = {
      id: task?.id || "",
      title,
      description,
      priority,
      dueDate: dueDate || undefined,
      columnId,
    }

    onSubmit(updatedTask)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel()
      } else if (e.key === "Enter" && e.ctrlKey) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [title, description, priority, dueDate, columnId])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">میزان اهمیت</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">کم</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">زیاد</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="column">لیست</Label>
              <Select value={columnId} onValueChange={setColumnId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">تاریخ انجام (اختیاری)</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              لغو
            </Button>
            <Button type="submit">{task ? "به روزرسانی تسک" : "ساخت تسک"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


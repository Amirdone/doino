"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddColumnFormProps {
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function AddColumnForm({ onSubmit, onCancel }: AddColumnFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      onSubmit(title)
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>اضاف کردن لیست جدید</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="columnTitle">عنوان لیست</Label>
            <Input
              id="columnTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="نام لیست را وارد کنید"
              autoFocus
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              لغو
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              اضافه کردن لیست
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


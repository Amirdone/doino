"use client"

import type React from "react"

import { useState } from "react"
import { Camera } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  fullName: string
  username: string
  profilePicture: string
  email: string
  phone: string
}

interface EditProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export function EditProfileDialog({ open, onOpenChange, user }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your API
    console.log("Updated profile:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="ml-80">ویرایش پروفایل</DialogTitle>
          <DialogDescription className="ml-40">پس از تغییرات دکمه ثبت تغییرات را انتخاب کنید</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-2 border-primary">
                <AvatarImage src={formData.profilePicture} alt={formData.fullName} />
                <AvatarFallback>{formData.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  تغییر عکس
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fullName">نام کامل</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">ایدی</Label>
              <Input id="username" value={user.username} disabled className="bg-muted" />
              <div className="text-xs text-muted-foreground">ساخته شده توسط سیستم</div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <div className="text-xs text-muted-foreground">تغییر ایمیل نیاز به هویت سنجی دوباره دارد </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">شماره تلفن</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              <div className="text-xs text-muted-foreground">
              تغییر شماره تلفن نیاز به هویت سنجی دوباره دارد 
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              لغو
            </Button>
            <Button type="submit">ثبت تغییرات </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


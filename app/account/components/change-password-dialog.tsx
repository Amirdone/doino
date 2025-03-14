"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "newPassword") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation
    let strength = 0

    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "ضغیف"
    if (passwordStrength <= 50) return "متوسط"
    if (passwordStrength <= 75) return "خوب"
    return "عالی"
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const handleSendVerification = () => {
    // Here you would typically send a verification code to the user's email or phone
    setVerificationSent(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the verification code and update the password
    console.log("Password change submitted:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تغییر رمز عبور</DialogTitle>
          <DialogDescription>
            {!verificationSent
              ? "رمز جدید و رمز فعلی را وارد کنید."
              : "کد تایید ارسالی به ایمیل یا شماره تلفن را وارد کنید"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {!verificationSent ? (
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newPassword">رمز عبور جدید</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {formData.newPassword && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>قدرت رمز عبور</span>
                      <span>{getStrengthLabel()}</span>
                    </div>
                    <Progress value={passwordStrength} className={getStrengthColor()} />
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">تایید رمز عبور جدید</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.newPassword &&
                  formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">رمز عبور یکسان نیست</p>
                  )}
              </div>
            </div>
          ) : (
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">کد تایید</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="کد تایید ۶ رقمی را ارسال کنید"
                />
                <p className="text-xs text-muted-foreground">
                  کد تایید ارسال شد
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            {!verificationSent ? (
              <>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  لغو
                </Button>
                <Button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={
                    !formData.currentPassword ||
                    !formData.newPassword ||
                    !formData.confirmPassword ||
                    formData.newPassword !== formData.confirmPassword
                  }
                >
                  ادامه
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => setVerificationSent(false)}>
                  برگشت
                </Button>
                <Button type="submit" disabled={!verificationCode || verificationCode.length < 6}>
                  تغییر رمز عبور
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


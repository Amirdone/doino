"use client"

import type React from "react"

import { useState } from "react"

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

interface VerifyContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contactType: "email" | "phone" | null
  contactValue: string
}

export function VerifyContactDialog({ open, onOpenChange, contactType, contactValue }: VerifyContactDialogProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleSendCode = () => {
    // Here you would typically send a verification code to the user's email or phone
    setCodeSent(true)
    startCountdown()
  }

  const startCountdown = () => {
    setIsResending(true)
    setCountdown(60)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsResending(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleResendCode = () => {
    // Here you would typically resend the verification code
    startCountdown()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the verification code
    console.log("Verification submitted for", contactType, ":", verificationCode)
    onOpenChange(false)
  }

  const handleClose = () => {
    setVerificationCode("")
    setCodeSent(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify {contactType === "email" ? "Email Address" : "Phone Number"}</DialogTitle>
          <DialogDescription>
            {!codeSent
              ? `ارسال کد تایید به ${contactValue}`
              : `ارسال کد تایید به ${contactValue}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {!codeSent ? (
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                دکمه پایین را جهت ارسال کد انتخاب کنید
              </p>
              <Button type="button" onClick={handleSendCode} className="w-full">
                ارسال کد تایید
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">کد تایید</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter the 6-digit code"
                  maxLength={6}
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">کد را دریافت نکردید؟</span>
                  {isResending ? (
                    <span className="text-muted-foreground">ارسال دوباره {countdown}s</span>
                  ) : (
                    <Button type="button" variant="link" className="p-0 h-auto text-xs" onClick={handleResendCode}>
                    ارسال دوباره
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              لغو
            </Button>
            {codeSent && (
              <Button type="submit" disabled={!verificationCode || verificationCode.length < 6}>
                تایید
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


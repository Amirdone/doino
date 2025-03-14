"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  Check,
  X,
  Camera,
  Lock,
  Paintbrush,
  Bell,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { EditProfileDialog } from "@/app/account/components/edit-profile-dialog";
import { ChangePasswordDialog } from "@/app/account/components/change-password-dialog";
import { VerifyContactDialog } from "@/app/account/components/verify-contact-dialog";
import { ThemeToggle } from "../../components/theme-toggle";

// Mock user data
const user = {
  fullName: "امیرعلی باقری",
  username: "123456789",
  profilePicture: "/placeholder.svg?height=100&width=100",
  email: "amiralibagheriiii90@gmail.com",
  emailVerified: true,
  phone: "09034025194",
  phoneVerified: false,
  registrationDate: new Date("2023-05-15"),
  theme: "light",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

export function UserProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(user.theme);
  const [notifications, setNotifications] = useState(user.notifications);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showVerifyContact, setShowVerifyContact] = useState(false);
  const [contactToVerify, setContactToVerify] = useState<
    "email" | "phone" | null
  >(null);

  const handleVerifyContact = (type: "email" | "phone") => {
    setContactToVerify(type);
    setShowVerifyContact(true);
  };

  return (
    <>
      <Card className="max-w-3xl mx-auto" dir="rtl">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={user.profilePicture} alt={user.fullName} />
              <AvatarFallback>
                {user.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <CardTitle className="text-2xl">{user.fullName}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                نام کاربری: <span className="font-mono">{user.username}</span>
                <Badge variant="outline">تولید شده توسط سیستم</Badge>
              </CardDescription>
              <CardDescription>
                عضو از {format(user.registrationDate, "MMMM d, yyyy")}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="md:self-start flex gap-2 items-center  border-green-600 text-black"
              onClick={() => setShowEditProfile(true)}
            >
              <Camera className="h-4 w-4 stroke-green-600" />
              ویرایش پروفایل
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ThemeToggle />

          {/* Profile Information Section */}
          <div>
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-6 h-auto "
                >
                  <span className="font-semibold text-lg">اطلاعات پروفایل</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isProfileOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                align="start"
                sideOffset={0}
              >
                <div className="p-4 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">آدرس ایمیل</Label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            id="email"
                            value={user.email}
                            readOnly
                            className="pr-10"
                          />
                          {user.emailVerified && (
                            <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                          )}
                        </div>
                        {!user.emailVerified ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyContact("email")}
                          >
                            تایید
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEditProfile(true)}
                          >
                            ویرایش
                          </Button>
                        )}
                      </div>
                      {user.emailVerified && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Check className="ml-1 h-3 w-3" /> تایید شده
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره تلفن</Label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            id="phone"
                            value={user.phone}
                            readOnly
                            className="pr-10"
                          />
                          {user.phoneVerified && (
                            <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                          )}
                        </div>
                        {!user.phoneVerified ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyContact("phone")}
                          >
                            تایید
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEditProfile(true)}
                          >
                            ویرایش
                          </Button>
                        )}
                      </div>
                      {!user.phoneVerified && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          <X className="ml-1 h-3 w-3" /> تایید نشده
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator />
          </div>

          {/* Change Password Section */}
          <div>
            <DropdownMenu
              open={isPasswordOpen}
              onOpenChange={setIsPasswordOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-6 h-auto"
                >
                  <span className="font-semibold text-lg">تغییر رمز عبور</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isPasswordOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                align="start"
                sideOffset={0}
              >
                <div className="p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    رمز عبور خود را به صورت امن تغییر دهید. قبل از اعمال
                    تغییرات، هویت شما را تأیید خواهیم کرد.
                  </p>
                  <Button
                    className="w-full flex items-center gap-2"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <Lock className="h-4 w-4" />
                    تغییر رمز عبور
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator />
          </div>

          {/* Customization Section */}
          <div>
            <DropdownMenu
              open={isCustomizationOpen}
              onOpenChange={setIsCustomizationOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-6 h-auto"
                >
                  <span className="font-semibold text-lg">شخصی‌سازی</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isCustomizationOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                align="start"
                sideOffset={0}
              >
                <div className="p-4 space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      تنظیمات اعلان‌ها
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">
                          اعلان‌های ایمیل
                        </Label>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              email: checked,
                            })
                          }
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications">
                          اعلان‌های پیامکی
                        </Label>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, sms: checked })
                          }
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditProfileDialog
        open={showEditProfile}
        onOpenChange={setShowEditProfile}
        user={user}
      />

      <ChangePasswordDialog
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />

      <VerifyContactDialog
        open={showVerifyContact}
        onOpenChange={setShowVerifyContact}
        contactType={contactToVerify}
        contactValue={contactToVerify === "email" ? user.email : user.phone}
      />
    </>
  );
}

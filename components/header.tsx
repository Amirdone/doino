import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link"
const Header =()=>{
    return (
 /* Header */
 <div
 className="fixed top-0 left-0 w-full flex justify-between px-8 py-4 z-10"
 style={{
   
 }}
>
    <div>
 {/* لوگو سمت راست */}
 <Link rel="/" href="/homepage" >
 <Button
   variant="ghost"
   className="hover:bg-transparent focus:bg-transparent mr-24"
 >
   <div className="flex items-center gap-2">
     <div className="w-10 h-10 bg-green-500 rounded-full"></div>
     <span className="font-bold text-white">دویینو</span>
   </div>
 </Button>
 </Link>
 </div>
 {/* پروفایل سمت چپ */}
 <Link
   href="/account"
   rel="noopener noreferrer"
   className="flex items-center ml-24"
 >
   <Avatar>
     <AvatarImage
       src="/account"
       alt="GitHub Profile"
     />
     <AvatarFallback>AM</AvatarFallback>
   </Avatar>
 </Link>
</div>
 
    );
   
}
export default Header
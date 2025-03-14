"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import Header from "@/components/header"
export default function HomePage() {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen w-full text-white"
      style={{
        background: "linear-gradient(90deg, #1e293b, #0f172a)", // پس‌زمینه
        minHeight: "100vh", // حداقل ارتفاع برابر با کل صفحه
      }}
    >
      {/* Header */}
      <div>
        <Header/>
      </div>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-5xl font-extrabold leading-snug">
          مسیر <span className="text-green-500">رشد و شکوفایی</span> را ساده
          کنید
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-xl">
          با دویینو، مدیریت کارها و تیم‌های خود را به ساده‌ترین و موثرترین شکل
          ممکن انجام دهید.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          {/* دکمه الان شروع کن */}
          <Link rel="/projects" href="/projects" >
          <Button className="bg-green-500 text-black hover:bg-green-600 rounded-full px-8 py-4 text-lg" >
            
            الان شروع کن
          </Button>
          </Link>
          {/* دکمه ویدیو معرفی */}
        </div>
      </div>

      {/* Footer */}
      <div
        className="fixed bottom-0 left-0 w-full flex justify-center gap-8 px-4 py-3 z-10"
        style={{
          background: "linear-gradient(90deg, #1e293b, #0f172a)", // گرادیان دقیق فوتر
          backdropFilter: "blur(10px)",
        }}
      >
        {/*  
        <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mx-auto text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </Button>

       
        <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mx-auto text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M3 12h18M3 20h18"
            />
          </svg>
        </Button>

      
        <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mx-auto text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7v4m4-4v4m4-4v4M3 7h18M3 3h18M4 21h16"
            />
          </svg> 
        </Button> */}
      </div>
    </div>
  );
}

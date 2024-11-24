"use client";
import Footer from "@/components/footer";
import Image from 'next/image'
import doino from "@/public/doino.svg"
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div className=" bg-slate-100 ">
      <div>
        <Navbar />
      </div>
      <div className="pt-24">
        <Footer />
      </div>
    </div>
  );
}

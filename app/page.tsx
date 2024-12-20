"use client";
import Footer from "@/components/footer";
import Image from 'next/image'
import doino from "@/public/doino.svg"
import { Button } from "@/components/ui/button";
import LandingSectionKanban from "@/components/LandingSectionKanban";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/BottomNav";
export default function Home() {
  return (
    <div className=" bg-slate-100 ">
      <div>
        <Navbar />
        <BottomNav/>
      </div>
      <div className="pt-24">
        <LandingSectionKanban />
        <Footer/>
      </div>
    </div>
  );
}

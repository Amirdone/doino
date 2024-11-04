import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Breadcrumb } from "@/components/ui/breadcrumb";


import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Button variant="link">Button</Button>
      <Calendar/>
      <Breadcrumb/>
    </div>
  );
}

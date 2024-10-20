import { House } from "lucide-react";
import Link from "next/link";

const Navbarlink = () => {
  return (
    <div className="flex">
      <Link href={"/"} className="ml-5 font-bold flex items-center gap-1">
        <House className="max-h-4 max-w-4" />
        <div>خانه</div>
      </Link>
      <Link href={"/"} className="ml-5 text-l">
        تقویم
      </Link>
      <Link href={"/"} className="text-l">
        رویدادها
      </Link>
    </div>
  );
};
export default Navbarlink;

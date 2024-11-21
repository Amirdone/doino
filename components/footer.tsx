import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">لوگو</h2>
          <p className="text-gray-400">
        سوسیس
          </p>
        </div>

        {/* بخش دوم: لینک‌ها */}
        <div>
          <h3 className="text-xl font-bold mb-4">لینک‌های سریع</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">تماس با ما</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">شماره تلفن:</li>
            <li className="text-gray-400">ایمیل: </li>
          </ul>
          <Button className="mt-4 bg-green-500 text-white hover:bg-green-600">
            ارسال پیام
          </Button>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
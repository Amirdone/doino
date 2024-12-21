import Link from 'next/link';

const LandingSectionKanban = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
        
        {/* بخش متن */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
            سیستم برنامه‌ریزی کانبان
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            در دنیای پویا و رقابتی امروز، نیاز به روشی چابک و ساختاریافته برای هدایت وظایف و پروژه‌ها اجتناب‌ناپذیر است.
            سیستم برنامه‌ریزی کانبان در دویینو با استفاده از بردهای بصری، کارت‌ها و جریان‌های قابل تنظیم به شما کمک می‌کند
            تا روند کار را به‌طور شفاف رصد کرده، فعالیت‌ها را هوشمندانه اولویت‌بندی کنید و بهره‌وری تیم خود را به سطح بالاتری ارتقا دهید.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span> شفافیت در فرآیندها و وضعیت فعلی هر وظیفه
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span> انعطاف‌پذیری بالا برای تغییرات لحظه‌ای و بدون اختلال
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span> مدیریت زمان و کاهش اتلاف منابع
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">•</span> تقویت همکاری، هم‌سویی و هماهنگی بین اعضای تیم
            </li>
          </ul>
          <div className="mt-8">
            <Link
              href="/kanvan"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-md"
            >
              شروع کنید
            </Link>
          </div>
        </div>
        
        {/* بخش تصویر (اختیاری) */}
        <div className="flex-1 flex justify-center">
          <img 
            src="/images/kanban-illustration.png" 
            alt="کانبان" 
            className="w-full h-auto max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSectionKanban;

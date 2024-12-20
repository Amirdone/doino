import Link from 'next/link';
import { HomeIcon, CubeIcon, BookOpenIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const BottomNav = () => {
  const navItems = [
    { href: '/', label: 'صفحه‌اصلی', Icon: HomeIcon },
    { href: '/services', label: 'خدمات', Icon: CubeIcon },
    { href: '/blog', label: 'بلاگ', Icon: BookOpenIcon },
    { href: '/cart', label: 'سبدخرید', Icon: ShoppingCartIcon },
    { href: '/account', label: 'حساب‌کاربری', Icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-4 w-full flex justify-center z-50">
      <ul className="flex items-center justify-between bg-white/80 backdrop-blur rounded-lg border border-gray-200 shadow p-2 w-11/12 max-w-md mx-auto">
        {navItems.map(({ href, label, Icon }) => (
          <li key={href} className="flex flex-col items-center text-gray-700 hover:text-gray-900 mx-2">
            <Link href={href} className="flex flex-col items-center">
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;

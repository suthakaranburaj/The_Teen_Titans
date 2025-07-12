// components/Navbar.js
'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { logoutUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import NotificationPopup from './NotificationPopup';
import { usePathname } from "next/navigation";



export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUserName('');
    router.push('/auth');
  };

  useEffect(() => {

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/questions", label: "Questions" }];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">StackIt</h1>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === href
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationPopup />
            <Link
              href="/ask"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Ask Question
            </Link>
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 px-3 py-2 text-sm font-medium">
                  Hi, {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link href="/auth" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

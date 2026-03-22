"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Rezepte" },
    ...(user ? [{ href: "/recipes/add", label: "Rezept hinzufügen" }] : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"; // Home nur exakt
    }
    if (href === "/recipes") {
      // Nur aktiv wenn /recipes exakt oder /recipes/ (nicht /recipes/add oder /recipes/[id])
      return pathname === "/recipes" || pathname === "/recipes/";
    }
    // Für alle anderen: normal mit startsWith
    return pathname.startsWith(href);
  };

  async function handleLogout() {
    await logout();
    router.push("/");
  }

    return (
    <header className="header mb-3 bg-white dark:bg-gray-800 rounded-lg top-0">
      <div className="flex items-center justify-center px-8 py-3 relative">
        {/* Logo links */}
        <Link href="/" className="flex items-center gap-2 absolute left-8 top-1/2 -translate-y-1/2">
          <Image
            src="/images/logo.png"
            alt="Essenza Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="font-semibold text-xl text-gray-800 dark:text-gray-100">
            Essenza
          </span>
        </Link>

        {/* Navigation zentriert */}
        <nav className="flex-1 text-center">
          <ul className="flex items-center justify-center space-x-6">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      p-3 border-b-2 duration-200 cursor-pointer
                      border-emerald-500 border-opacity-0 
                      hover:border-opacity-100 hover:text-emerald-500
                      dark:border-emerald-400 dark:hover:text-emerald-400
                      aria-[current=page]:text-emerald-500 
                      aria-[current=page]:border-emerald-500 
                      dark:aria-[current=page]:text-emerald-400 
                      dark:aria-[current=page]:border-emerald-400
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Logout */}
        <div className="flex items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <span className="text-sm text-gray-400">Laden...</span>
          ) : user ? (
            <div className="flex items-center gap-2">
              {/* User-Badge */}
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.name || user.email}
                </span>
              </div>

              {/* Logout-Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors cursor-pointer px-2 py-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Abmelden"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
              >
                Registrieren
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

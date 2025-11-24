"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Rezepte" },
    { href: "/recipes/add", label: "Rezepte hinzufügen" },
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

  return (
    <div className="header rounded-lg mb-3 top-0 bg-white dark:bg-gray-800 flex items-center justify-center px-8 py-2">
      <nav className="nav text-lg text-center">
        <ul className="flex items-center space-x-6">
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
    </div>
  );
}

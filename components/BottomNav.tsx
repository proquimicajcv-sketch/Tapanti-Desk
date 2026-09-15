"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/tarjetario", label: "Tarjetario" },
  { href: "/hallazgos", label: "Mis Hallazgos" },
  { href: "/comparar", label: "Comparar" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-amber-900/20 bg-[#f8f0df]/95 backdrop-blur">
      <ul className="mx-auto grid max-w-4xl grid-cols-3 gap-1 p-2">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-xl px-3 py-2 text-center text-xs font-semibold transition ${
                  active
                    ? "bg-[#2D5A27] text-white"
                    : "bg-white/80 text-[#2D5A27] hover:bg-emerald-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

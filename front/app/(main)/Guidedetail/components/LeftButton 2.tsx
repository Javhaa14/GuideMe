"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/home", external: false },
  { name: "Explore", href: "/explore", external: false },
  { name: "View page", href: "https://example.com", external: true },
  { name: "Account settings", href: "/settings", external: false },
];

export const LeftButton = () => {
  const pathname = usePathname();

  return (
    <nav className="w-48 p-4 space-y-1 text-sm">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            className={clsx(
              "flex items-center justify-between px-3 py-2 rounded-md transition hover:bg-gray-100",
              {
                "bg-gray-100 font-medium": isActive,
              }
            )}
          >
            <span>{link.name}</span>
            {link.external && (
              <ExternalLink className="w-4 h-4 text-gray-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

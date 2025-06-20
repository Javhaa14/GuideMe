"use client";

import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Shield,
  Zap,
  Users,
  BookOpen,
  HelpCircle,
  FileText,
  Settings,
  Star,
  TentTree,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JSX } from "react/jsx-runtime";

// ✅ FooterLink тайп тодорхойлох
type FooterLink = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

export default function Footer() {
  // ✅ Тайп ашиглаж тодорхой болгох
  const footerLinks: Record<string, FooterLink[]> = {
    product: [
      {
        name: "Features",
        href: "/features",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: "Pricing",
        href: "/pricing",
        icon: <Star className="w-4 h-4" />,
      },
      {
        name: "Security",
        href: "/security",
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: "Enterprise",
        href: "/enterprise",
        icon: <Users className="w-4 h-4" />,
      },
    ],
    resources: [
      {
        name: "Documentation",
        href: "/docs",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        name: "Help Center",
        href: "/help",
        icon: <HelpCircle className="w-4 h-4" />,
      },
      {
        name: "API Reference",
        href: "/api",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        name: "System Status",
        href: "/status",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
      color: "hover:text-[#22d3ee]",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com",
      color: "hover:text-[#2dd4bf]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
      color: "hover:text-[#06b6d4]",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
      color: "hover:text-[#14b8a6]",
    },
  ];

  return (
    <footer className="w-full inset-0 bg-black/20 backdrop-blur-xl text-white">
      {/* Footer links + branding + social */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
        {/* Branding */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <TentTree className="text-gray-900 dark:text-white" size={24} />
            </div>
            <h4 className="text-2xl font-bold">GuideMe</h4>
          </div>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" /> guideme@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" /> 99999999
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" /> Ulaanbaatar, Mongolia
            </div>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 transition",
                  s.color
                )}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="space-y-6">
            <h5 className="text-lg font-semibold capitalize text-sky-400">
              {section}
            </h5>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-slate-300 hover:text-white">
                    {link.icon && <span>{link.icon}</span>}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

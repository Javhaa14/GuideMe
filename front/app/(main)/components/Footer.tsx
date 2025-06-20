<<<<<<< HEAD
"use client"
import ChatBot from "@/components/ui/Chatbot";
import { TentTree } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";

export const Footer = () => {

  return (
    <div className="bg-green-400 text-black py-10 w-screen h-[280px] relative">
      <div className="flex px-20 w-screen justify-between">
        <div className="gap-3 pr-30">
          <div className="gap-2 flex pb-3">
            <TentTree />
            <p className="text-4 italic font-bold">Guide</p>
          </div>
          <div>
            <p className="text-[14px] font-normal">
              © 2025 Guide. All Rights Reserved.
            </p>
          </div>
        </div>

        <div className="flex gap-[96px] w-[950px] justify-end">
          <div>
            <p className="text-[14px] font-normal pb-[12px]">
              Contact Information
            </p>

            <div>
              <div className="flex items-center gap-[12px] pb-[24px]">
                <Mail className="w-[16px] h-[16px]" />
                <div className="text-[14px] ">
                  <p className="font-medium">Email:</p>
                  <p className="font-normal">guide@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">
                <Phone className="w-[16px] h-[16px]" />
                <div className="text-[14px] ">
                  <p className="font-medium">Phone:</p>
                  <p className="font-normal">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[14px]">
            <h3 className="font-normal pb-3">Follow us</h3>
            <div className="flex gap-4 font-medium">
              <a href="https://www.facebook.com/">Facebook</a>
              <a href="https://www.instagram.com/">Instagram</a>
              <a href="https://www.twitter.com/">Twitter</a>
              <a href="https://www.youtube.com/">Youtube</a>
            </div>
          </div>
        </div>
      </div>
     

    </div>
  );
};
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

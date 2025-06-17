"use client";

import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Zap,
  Users,
  BookOpen,
  HelpCircle,
  FileText,
  Settings,
  Star,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FooterLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

type SocialLink = {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
};

export default function Footer() {
  const footerLinks: Record<string, FooterLink[]> = {
    product: [
      {
        name: "Features",
        href: "/features",
        icon: <Zap className="w-4 h-4" />,
      },
      { name: "Pricing", href: "/pricing", icon: <Star className="w-4 h-4" /> },
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

  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      icon: (
        <Twitter className="w-5 h-5">
          <title>Twitter</title>
        </Twitter>
      ),
      href: "https://twitter.com",
      color: "hover:text-[#22d3ee]",
    },
    {
      name: "GitHub",
      icon: (
        <Github className="w-5 h-5">
          <title>GitHub</title>
        </Github>
      ),
      href: "https://github.com",
      color: "hover:text-[#2dd4bf]",
    },
    {
      name: "LinkedIn",
      icon: (
        <Linkedin className="w-5 h-5">
          <title>LinkedIn</title>
        </Linkedin>
      ),
      href: "https://linkedin.com",
      color: "hover:text-[#06b6d4]",
    },
    {
      name: "Instagram",
      icon: (
        <Instagram className="w-5 h-5">
          <title>Instagram</title>
        </Instagram>
      ),
      href: "https://instagram.com",
      color: "hover:text-[#14b8a6]",
    },
  ];

  const stats = [
    { label: "Happy People", value: "50K+" },
    { label: "Countries", value: "120+" },
    { label: "Enjoy", value: "99.9%" },
    { label: "Support Rating", value: "4.9/5" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white">
      {/* Hero section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Discover authentic journeys</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              We connect you with local guides to explore Mongolia through a
              truly personal experience. Safe. Simple. Unforgettable.
            </p>
            <Button className="bg-cyan-500 text-white px-6 w-fit">
              Get enjoy your life <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Shield className="w-6 h-6 mb-2 text-sky-400" />,
                text: "Verified Local Guides",
              },
              {
                icon: <BookOpen className="w-6 h-6 mb-2 text-sky-400" />,
                text: "Tailored Experiences",
              },
              {
                icon: <Heart className="w-6 h-6 mb-2 text-sky-400" />,
                text: "Community Driven",
              },
              {
                icon: <HelpCircle className="w-6 h-6 mb-2 text-sky-400" />,
                text: "Support That Cares",
              },
            ].map((f, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-xl text-white">
                {f.icon}
                <p className="font-semibold">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-sky-400">{s.value}</div>
              <div className="text-slate-300 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold">GuideMe</h4>
          </div>
          <p className="text-slate-300">
            Building the future of digital experiences with innovation.
          </p>
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
                aria-label={s.name}
                className={cn(
                  "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 transition",
                  s.color
                )}
              >
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
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                  >
                    {link.icon && <span>{link.icon}</span>}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-300">
          <div className="flex items-center gap-2">
            © 2025 GuideMe. Made with <Heart className="w-4 h-4 text-sky-400" />{" "}
            in Ulaanbaatar
          </div>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-cyan-100/10 text-cyan-400 border-cyan-400/30">
              <Shield className="w-3 h-3 mr-1" /> SOC 2
            </Badge>
            <Badge className="bg-cyan-100/10 text-teal-400 border-teal-400/30">
              <Zap className="w-3 h-3 mr-1" /> 99.9% Uptime
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

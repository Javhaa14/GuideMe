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
  CreditCard,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatsSection } from "./Stats";

// ✅ FooterLink тайп тодорхойлох
type FooterLink = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const featureCards = [
  { title: "Verified", subtitle: "Local Guides", Icon: Shield },
  { title: "Tailored", subtitle: "Experiences", Icon: BookOpen },
  { title: "Community", subtitle: "Driven", Icon: Heart },
  { title: "Support", subtitle: "That Cares", Icon: HelpCircle },
];

const Card = ({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className="w-full p-4 rounded border border-slate-300 relative overflow-hidden group bg-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </div>
  );
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
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white">
      {/* Hero section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Discover authentic journeys</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              We connect you with local guides to explore Mongolia through a
              truly personal experience.
            </p>
            <Button className="bg-cyan-500 text-white px-6 w-fit">
              Get enjoy your life <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-6">
            <p className="text-xl font-semibold">Why choose us?</p>
            <div className="grid gap-4 grid-cols-2">
              {featureCards.map((card, i) => (
                <Card key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <StatsSection />

      {/* Footer links + branding + social */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
        {/* Branding */}
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

      {/* Bottom bar */}
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

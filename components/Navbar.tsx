"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteConfig } from "@/types/content";
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface NavbarProps {
  config: SiteConfig;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Shrey Tech", href: "#shrey-tech" },
    { label: "Production", href: "#production" },
    { label: "Industries", href: "#industries" },
    { label: "Journal", href: "#journal" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0E]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand Signature */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/30 shadow-[0_0_15px_rgba(255,94,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/logo.png"
              alt="Shrey Media Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-syne font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF5E00] transition-colors">
                SHREY MEDIA
              </span>
            </div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#D4FF00]">
              Marketing × Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action CTA & Admin Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Open CMS Admin Editor"
            >
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
            </button>
          )}

          <a
            href={`https://wa.me/91${config.phone}?text=Hi%20Shrey%20Media,%20I'd%20like%20to%20grow%20my%20business.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn relative inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0E]/95 border-b border-white/10 px-6 py-6 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-[#FF5E00] py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shrey%20Media,%20I'd%20like%20to%20grow%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold py-3 rounded-full text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp: +91 {config.phone}</span>
              </a>
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-mono-tech text-gray-300 bg-white/5 border border-white/10"
                >
                  ⚙️ Open CMS Admin Panel
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

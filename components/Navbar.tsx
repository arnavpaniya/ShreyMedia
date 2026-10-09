"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteConfig } from "@/types/content";
import { MessageSquare, Menu, X, ArrowUpRight, Zap } from "lucide-react";

interface NavbarProps {
  config: SiteConfig;
  onOpenAdmin?: () => void;
  onOpenProposal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenProposal }) => {
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
    { label: "Home", href: "/#hero" },
    { label: "Services", href: "/#services" },
    { label: "Production", href: "/#production" },
    { label: "About Me", href: "/#about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07070A]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-gradient-to-b from-[#07070A]/80 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand Signature */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/40 shadow-[0_0_20px_rgba(255,94,0,0.35)] transition-transform duration-300 group-hover:scale-105 bg-black">
            <Image
              src="/brand/logo.png"
              alt="Shrey Media Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF5E00] transition-colors drop-shadow">
              SHREY MEDIA
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#D4FF00] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Jaipur HQ • Active
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 border border-white/15 px-5 py-2 rounded-full backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-gray-200 hover:text-white rounded-full transition-all duration-200 hover:bg-white/15"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenProposal && (
            <button
              onClick={onOpenProposal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono-tech font-bold text-[#FFAE33] bg-[#FFAE33]/10 hover:bg-[#FFAE33]/20 border border-[#FFAE33]/30 transition-all hover:scale-102"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Get Scope</span>
            </button>
          )}

          <a
            href={`https://wa.me/91${config.phone}?text=Hi%20Shrey%20Media,%20I'd%20like%20to%20grow%20my%20business.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn relative inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E00] via-[#FF8800] to-[#FFAE33] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(255,94,0,0.4)] border border-white/20"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-2xl text-gray-200 hover:text-white bg-black/50 border border-white/15 backdrop-blur-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07070A]/95 border-b border-white/15 px-4 sm:px-6 py-6 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-[#FF5E00] active:text-[#FF5E00] active:bg-white/5 px-3 py-3 rounded-xl border-b border-white/5 flex items-center min-h-[44px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              {onOpenProposal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProposal();
                  }}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-[#FFAE33]/15 border border-[#FFAE33]/40 text-[#FFAE33] font-bold py-3 px-4 rounded-full text-center text-sm active:scale-98 transition-transform"
                >
                  <Zap className="w-4 h-4" />
                  <span>Interactive Proposal Builder</span>
                </button>
              )}

              <a
                href={`https://wa.me/91${config.phone}?text=Hi%20Shrey%20Media,%20I'd%20like%20to%20grow%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E00] to-[#FFAE33] text-white font-bold py-3.5 px-4 rounded-full text-center shadow-lg text-sm active:scale-98 transition-transform"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp: +91 {config.phone}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

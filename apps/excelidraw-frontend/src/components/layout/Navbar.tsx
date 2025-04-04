"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@repo/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-gray-800"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">
              Sketchify
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/features" 
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <div className="flex items-center space-x-4 pl-4 border-l border-gray-700">
            <Link href="/signin" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
              Sign in
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                variant="outline"
                className="bg-white text-black hover:bg-gray-200 rounded-lg px-5 py-2 text-sm font-medium border-0 shadow-lg hover:shadow-white/10 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-300 hover:text-white p-2 border border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 py-5 px-4 space-y-3 bg-black/95 backdrop-blur-lg border-t border-gray-800 animate-fadeIn">
          <Link href="/features" className="block text-gray-300 hover:text-white transition-colors py-3 border-b border-gray-800">
            Features
          </Link>
          <div className="pt-3 flex flex-col space-y-3">
            <Link href="/signin" className="block text-gray-300 hover:text-white transition-colors py-2 text-center">
              Sign in
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-200 rounded-lg py-3 font-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
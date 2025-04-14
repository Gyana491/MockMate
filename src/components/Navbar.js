"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-indigo-900/90 to-neutral-900/90 backdrop-blur-sm fixed w-full z-50 animate-fade-in">
      <nav className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold animate-fade-in">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                InterviewAI
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors animate-fade-in delay-100"
            >
              Practice
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors animate-fade-in delay-200"
            >
              Interview Types
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors animate-fade-in delay-300"
            >
              Resources
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors animate-fade-in delay-400"
            >
              Community
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button
                variant="ghost"
                className="hidden md:flex text-gray-300 hover:text-white hover:bg-white/10 animate-fade-in delay-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="hidden md:flex bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 hover:opacity-90 transition-all duration-300 animate-fade-in delay-400">
                Sign Up
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-neutral-800/90 backdrop-blur-sm rounded-lg animate-fade-in">
            <div className="flex flex-col space-y-2 px-4">
              <Link
                href="#"
                className="text-gray-300 py-2 px-3 rounded hover:bg-neutral-700 transition-colors animate-fade-in delay-100"
              >
                Practice
              </Link>
              <Link
                href="#"
                className="text-gray-300 py-2 px-3 rounded hover:bg-neutral-700 transition-colors animate-fade-in delay-200"
              >
                Interview Types
              </Link>
              <Link
                href="#"
                className="text-gray-300 py-2 px-3 rounded hover:bg-neutral-700 transition-colors animate-fade-in delay-300"
              >
                Resources
              </Link>
              <Link
                href="#"
                className="text-gray-300 py-2 px-3 rounded hover:bg-neutral-700 transition-colors animate-fade-in delay-400"
              >
                Community
              </Link>
              <div className="pt-2 space-y-2">
                <Link href="/auth" className="w-full block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-white/10 animate-fade-in delay-500"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="w-full block">
                  <Button className="w-full bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 hover:opacity-90 transition-all duration-300 animate-fade-in delay-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

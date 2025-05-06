"use client";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent pointer-events-none"></div>
      
      {/* Abstract geometric shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-800 to-transparent opacity-20 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-gray-800 to-transparent opacity-20 rounded-tr-full"></div>
      
      {/* Grid accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_30%,rgba(120,120,120,0.15),transparent)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight animate-fadeIn text-white">
            Collaborative Drawing
            <span className="block mt-2 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-300 animate-fadeIn animation-delay-200">
            Create, collaborate, and share beautiful diagrams and sketches
            with this intuitive drawing tool. Let's get started.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn animation-delay-400">
            <Link href="/signin">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 rounded-lg border-gray-500 text-gray-300 hover:bg-gray-800 hover:border-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <span>Sign in</span>
                <Pencil className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-6 rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white border border-gray-700 shadow-lg hover:shadow-white/10 transition-all duration-300"
              >
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
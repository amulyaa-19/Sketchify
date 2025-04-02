"use client";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";

export default function Hero() {
  return (
<header className="relative pt-32 pb-20">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none"></div>
  <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-5xl lg:text-6xl font-bold tracking-tight animate-fadeIn">
        Collaborative Drawing
        <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Made Simple
        </span>
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-300 animate-fadeIn animation-delay-200">
        Create, collaborate, and share beautiful diagrams and sketches
        with our intuitive drawing tool. Let's get started.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn animation-delay-400">
        <Link href="/signin">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-6 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center"
          >
            <span>Sign in</span>
            <Pencil className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
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

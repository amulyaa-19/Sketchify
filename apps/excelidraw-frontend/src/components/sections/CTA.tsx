"use client";
import { Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-md p-8 sm:p-16 transition-all duration-300">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text mb-4">
              Ready to start creating?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Join Sketchify and bring your ideas to life — fast, simple, and together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center justify-center px-6 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white border border-gray-700 shadow-md hover:shadow-white/10 transition"
                >
                  Open Canvas
                  <Pencil className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/amulyaa-19/Sketchify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

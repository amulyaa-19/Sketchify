"use client";
import { Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-8 sm:p-16 shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                Ready to start creating?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 mb-10">
              Join Sketchify to embark on a journey of creating amazing diagrams
              and sketches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={"/signup"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center"
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
                  className="w-full sm:w-auto h-12 px-8 rounded-lg border border-gray-800 text-gray-300 hover:bg-gray-800/30 transition-all duration-300 hover:translate-y-[-4px]"
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

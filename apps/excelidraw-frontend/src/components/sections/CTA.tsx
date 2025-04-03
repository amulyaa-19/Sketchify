"use client"
import { Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-500/10 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="bg-gradient-to-r from-blue-400 to-gray-700 rounded-lg p-8 sm:p-16 shadow-lg border border-gray-700">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to start creating?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 mb-10">
              Join thousands of users who are already creating amazing
              diagrams and sketches with Sketchify.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center border-0"
              >
                Open Canvas
                <Pencil className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 rounded-lg border-gray-500 text-gray-300 hover:bg-gray-700/30 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
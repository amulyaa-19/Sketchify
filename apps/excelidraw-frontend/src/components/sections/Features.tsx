"use client";
import { Share2, Users2, Sparkles } from "lucide-react";

export default function Features() {
  const featuresData = [
    {
      icon: Share2,
      title: "Live Sharing",
      description: "Send a link, and anyone can join. See changes as they happen, instantly.",
    },
    {
      icon: Users2,
      title: "Work Together",
      description: "Multiple people can draw at once. Everyone stays in sync, no reloads.",
    },
    {
      icon: Sparkles,
      title: "Shapes That Help",
      description: "Pick from simple shapes to speed up your ideas. Clean and flexible.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
            What You Can Do
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Here’s what Sketchify makes simple. No fluff, just the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-white/10 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-gray-200" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

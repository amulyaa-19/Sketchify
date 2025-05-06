"use client";
import { Share2, Users2, Sparkles } from "lucide-react";
import { Card } from "@repo/ui/card";

export default function Features() {
  const featuresData = [
    {
      icon: Share2,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time. Share your drawings instantly with a simple link and see changes as they happen."
    },
    {
      icon: Users2,
      title: "Multi-user Editing",
      description: "Multiple users can edit the same canvas simultaneously. See who's drawing what with real-time cursors and notifications."
    },
    {
      icon: Sparkles,
      title: "Multiple Shapes",
      description: "Choose form a number of shapes and give your creativity new directions"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Amazing Features
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Everything you need to create stunning diagrams and sketches with your team
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group"
              title=""
              href="/#"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-gray-200" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Sketchify
            </span>
          </div>
          <div className="flex space-x-6">

            <a
              href="https://github.com/amulyaa-19"
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="mailto:srivastava.amulya19@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              aria-label="Contact"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href="mailto:srivastava.amulya19@gmail.com" 
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              srivastava.amulya19@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 Sketchify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

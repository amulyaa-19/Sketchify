import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-transparent bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text">
          Draw. Collaborate. Create.
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Sketchify is your real-time collaborative whiteboard for ideas,
          diagrams, and doodles.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold rounded-xl px-6 py-3 shadow-md hover:shadow-white/10 transition cursor-pointer"
              variant="outline"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/signin">
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 rounded-xl px-6 py-3 transition cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

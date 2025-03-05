import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div>
        <div>
          <h1>
            Your AI career Coach for
            <br />
            Professional Success
          </h1>
          <p>
            Advance Your Carrer with personalized guidence, inteview prep, and
            AI-powered tools for job succcess.
          </p>
        </div>
        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/Kishan1835/mentor-x">
            <Button size="lg" className="px-8" variant="outline">
              Contribute Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

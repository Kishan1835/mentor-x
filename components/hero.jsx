"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures component only runs after hydration

    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
          <Link href="https://github.com/Kishan1835/mentor-x">
            <Button size="lg" variant="outline" className="px-8">Contribute Now</Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            {isClient && ( // Render only on client to prevent hydration mismatch
              <Image
                src="/banner-X.jpeg"
                width={1200}
                height={720}
                alt="Banner Image"
                className="rounded-lg shadow-2xl border mx-auto"
                priority={true} // Ensures SSR and Client match
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

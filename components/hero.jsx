<<<<<<< HEAD
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
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
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
=======
"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const HeroSection = () => {

  const imageRef = useRef(null)

  useEffect(() => {
    const imageElement = imageRef.current

    const handleScroll = () => {
      const scrollPostion = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPostion > scrollThreshold) {
        imageElement.classList.add("scrolled")
      } else {
        imageElement.classList.remove("scrolled")

      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])


  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center"  >
        <div className="space-y-6 mx-auto">
          <h1 className=" text-5xl font-bold md:txt-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto mz-w-[600px] text-muted-foreground md:text-xl">
            Advance Your Carrer with personalized guidence, inteview prep, and
            AI-powered tools for job succcess.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
>>>>>>> 7ab0f75325118c872a7b66297ea18cecc744f767
          <Link href="/dashboard">
            <Button size="lg" className="px-8 c">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/Kishan1835/mentor-x">
            <Button size="lg" variant="outline" className="px-8">
              Contribute Now
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
<<<<<<< HEAD
              src="/banner-X.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
=======
              src={"/banner-X.jpeg"}
              width={1200}
              height={720}
              alt="Banner Image"
              className="rounded-lg shadow-2xl border mx-auto"
              priority />
>>>>>>> 7ab0f75325118c872a7b66297ea18cecc744f767
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { Button } from "@/components/ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-[50%]">
      <div>Welcome to mentorX</div>
      <Button className>Click me</Button>
    </div>
  );
}

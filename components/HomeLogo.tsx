"use client";

import { useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";
import Image from "next/image";

export default function HomeLogo() {
  const { logoClick } = useContext(ColorContext);

  return (
    <div className="home-logo w-30 pointer" onClick={logoClick}>
      <Image
        src="/brand/logo.png"
        alt="logo"
        width={400}
        height={400}
        priority
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

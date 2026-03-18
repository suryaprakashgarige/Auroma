"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isMounted, setIsMounted] = useState(false);

  // useSpring for smooth tracking lag (Awwwards effect)
  const mouseX = useSpring(0, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      style={{
        left: mouseX,
        top: mouseY,
        transform: "translate(-50%, -50%)",
      }}
      className="pointer-events-none fixed z-50 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,169,106,0.06)_0%,transparent_70%)] mix-blend-screen opacity-100 hidden md:block"
    />
  );
}

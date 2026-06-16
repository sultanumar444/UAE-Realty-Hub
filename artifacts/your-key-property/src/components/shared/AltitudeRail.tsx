import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function AltitudeRail() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.8 });
  const [altitudeLabel, setAltitudeLabel] = useState("GROUND · Lobby");

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.1) setAltitudeLabel("GROUND · Lobby");
      else if (latest < 0.25) setAltitudeLabel("L12 · The Portfolio");
      else if (latest < 0.4) setAltitudeLabel("L24 · Rising");
      else if (latest < 0.55) setAltitudeLabel("L36 · The Numbers");
      else if (latest < 0.7) setAltitudeLabel("L48 · Prime Altitudes");
      else if (latest < 0.85) setAltitudeLabel("L54 · Concierge");
      else if (latest < 0.95) setAltitudeLabel("CLOUD · Trust");
      else setAltitudeLabel("PH · Penthouse");
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed right-4 top-0 bottom-0 z-40 hidden md:flex flex-col items-center justify-center pointer-events-none mix-blend-plus-lighter text-white/70">
      {/* Light beam */}
      <div className="absolute right-[9px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      {/* Track */}
      <div className="relative h-[60vh] w-[2px] bg-white/10 rounded-full mt-12 flex items-start">
        {/* Glow marker */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(201,151,76,0.8)] border border-white/50"
          style={{ top: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping: 20, stiffness: 90 }) }}
        />
        
        {/* Tick marks */}
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[0%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[12.5%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[25%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[40%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[55%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[70%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[85%] -left-[3px]" />
        <div className="absolute w-[8px] h-[1px] bg-white/30 top-[100%] -left-[3px]" />
      </div>

      {/* Rotating text label */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-end">
        <span className="font-mono text-xs font-semibold tracking-widest text-secondary rotate-180" style={{ writingMode: "vertical-rl" }}>
          {altitudeLabel}
        </span>
      </div>
    </div>
  );
}

// We need useTransform for the top property
import { useTransform } from "framer-motion";
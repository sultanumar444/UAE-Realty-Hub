import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AtmosphericBackground() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  // Background color interpolation based on scroll height
  // 0% Ground/Lobby: deep charcoal-navy (#0A1628) with a warm amber dusk glow at the bottom edge
  // ~33% Mid-rise: hazy twilight blue with scattered city-light specks
  // ~66% Skyline: clearer blue grading toward gold at the horizon
  // 100% Penthouse: golden-hour sky — peach/amber/soft-gold with a warm sun glow
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to top, #1a1625 0%, #0A1628 100%)",
      "linear-gradient(to top, #1e293b 0%, #0f172a 100%)",
      "linear-gradient(to top, #475569 0%, #1e293b 100%)",
      "linear-gradient(to top, #fcd34d 0%, #f6a192 40%, #7dd3fc 100%)"
    ]
  );

  // Cloud opacity (fades in upper 40%)
  const cloudOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 0.6]);
  
  // Cloud vertical parallax
  const cloudY1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const cloudY2 = useTransform(smoothProgress, [0, 1], [0, -400]);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0A1628] to-[#1e293b] pointer-events-none" />
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* City lights speckle overlay, fades out as we ascend */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"
        style={{ opacity: useTransform(smoothProgress, [0, 0.4], [0.3, 0]) }}
      />
      
      {/* Slow drifting clouds at the top */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-white/5 to-transparent blur-3xl rounded-[100%]"
        style={{ opacity: cloudOpacity, y: cloudY1 }}
      />
      <motion.div 
        className="absolute top-[10%] right-[-20%] w-[100%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-white/5 to-transparent blur-3xl rounded-[100%]"
        style={{ opacity: cloudOpacity, y: cloudY2 }}
      />
    </motion.div>
  );
}

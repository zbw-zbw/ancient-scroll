"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { PoemLine } from "@/data/poems";
import Particles from "./Particles";

interface PoemLineSlideProps {
 line: PoemLine;
 active: boolean;
 coverImage?: string;
}

export default function PoemLineSlide({ line, active, coverImage }: PoemLineSlideProps) {
 const textLight = line.textColor === "light";
 const [speaking, setSpeaking] = useState(false);

 // Stop speech on unmount
 useEffect(() => {
   return () => {
     if (typeof window !== "undefined" && window.speechSynthesis) {
       window.speechSynthesis.cancel();
     }
   };
}, []);

// Note: speaking state is managed via utterance.onend/onerror in handleReadLine
// No global speechSynthesis listeners needed (they cause duplicate callbacks across slides)

 const handleReadLine = useCallback(() => {
   if (typeof window === "undefined" || !window.speechSynthesis) return;
   if (window.speechSynthesis.speaking) {
     window.speechSynthesis.cancel();
     setSpeaking(false);
     return;
   }
   const utterance = new SpeechSynthesisUtterance(line.text);
   utterance.lang = "zh-CN";
   utterance.rate = 0.85;
   utterance.onend = () => setSpeaking(false);
   utterance.onerror = () => setSpeaking(false);
   setSpeaking(true);
   window.speechSynthesis.speak(utterance);
 }, [line.text]);

 return (
 <section
 className="slide relative flex min-h-screen items-center justify-center overflow-hidden"
 style={{
 background: `linear-gradient(135deg, ${line.gradientFrom}, ${line.gradientTo})`,
 }}
 >
 {/* Cover image background */}
 {coverImage && (
 <Image
 src={coverImage}
 alt=""
 fill
 className="absolute inset-0 object-cover opacity-15 mix-blend-overlay"
 loading="lazy"
 />
 )}

 {/* Scene image for this line */}
   {line.sceneImage && (
     <Image src={line.sceneImage} alt="" fill
       className="absolute inset-0 object-cover opacity-20"
       loading="lazy" />
   )}

   {/* Strong gradient overlay for text readability */}
   <div className="absolute inset-0 bg-black/30" />
   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

 {/* Read aloud button - top right corner */}
 <button
   onClick={handleReadLine}
   aria-label={speaking ? "停止朗读" : "朗读此句"}
   className={`absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-20 inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs backdrop-blur-sm transition-all active:scale-95 ${
     speaking
       ? "bg-white/25 text-white"
       : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
   }`}
   title={speaking ? "停止朗读" : "朗读此句"}
 >
   {speaking ? (
     <>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 animate-pulse">
         <path d="m11 5-6 14" />
         <path d="M22 5-16 14" />
         <path d="M4.72 8.72a3 3 0 0 1 0 6.56" />
         <path d="M19.28 8.72a3 3 0 0 1 0 6.56" />
       </svg>
       正在朗读...
     </>
   ) : (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
       <path d="M11 5 6 9H2v6h4l5 4V5z" />
       <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
     </svg>
   )}
 </button>

 <Particles type={line.particleType} />

 <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center md:max-w-6xl md:px-6">
 {/* Poem line */}
 <h3
 className={`font-calligraphy transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
 textLight ? "text-white" : "text-ink"
 } ${
 active
 ? "translate-y-0 opacity-100"
 : "translate-y-8 opacity-0"
 }`}
 style={{
 fontSize: "clamp(2.25rem, 8vw, 4.5rem)",
 textShadow: textLight
 ? "0 2px 24px rgba(0,0,0,0.5), 0 4px 48px rgba(0,0,0,0.3)"
 : "0 1px 8px rgba(0,0,0,0.3), 0 4px 24px rgba(0,0,0,0.2)",
 transitionDelay: active ? "0.25s" : "0s",
 }}
 >
 {line.text}
 </h3>

 {/* Annotation */}
 <p
className={`mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:text-lg ${
  active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
}`}
      style={{ transitionDelay: active ? "0.55s" : "0s", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
    >
 {line.annotation}
 </p>

 {/* Mood tag */}
 <div
 className={`mt-8 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
 active
 ? "translate-y-0 opacity-100"
 : "translate-y-4 opacity-0"
 }`}
 style={{ transitionDelay: active ? "0.8s" : "0s" }}
 >
 <span
 className={`inline-block rounded-full px-4 py-1.5 font-serif text-xs ${
 textLight
 ? "bg-white/20 text-white"
 : "bg-ink/10 text-ink/80"
 }`}
 >
 {line.mood}
 </span>
 </div>
 </div>
 </section>
 );
}

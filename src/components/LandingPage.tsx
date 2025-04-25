"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuBar } from "@/components/MobileMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEXT_ELEMENTS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrollSectionRef = useRef<HTMLDivElement | null>(null);
  const cubeWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollSection = scrollSectionRef.current;
    const cubeWrapper = cubeWrapperRef.current;

    if (!scrollSection || !cubeWrapper) return;

    while (cubeWrapper.firstChild) {
      cubeWrapper.removeChild(cubeWrapper.firstChild);
    }

    let currentTextElement = createTextElement(TEXT_ELEMENTS[0]);
    cubeWrapper.appendChild(currentTextElement);

    let currentIndex = 0;
    let isAnimating = false;

    function createTextElement(text: string): HTMLDivElement {
      const element = document.createElement("div");
      element.className =
        "text-item absolute text-white/50 text-[10vw] font-bold uppercase flex items-center justify-center";
      element.style.width = "100%";
      element.style.height = "100%";
      element.style.transformStyle = "preserve-3d";
      element.textContent = text;
      return element;
    }

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      const direction = e.deltaY > 0 ? -1 : 1;

      let nextIndex = (currentIndex + direction) % TEXT_ELEMENTS.length;
      if (nextIndex < 0) nextIndex = TEXT_ELEMENTS.length - 1;

      isAnimating = true;

      const nextTextElement = createTextElement(TEXT_ELEMENTS[nextIndex]);
      cubeWrapper.appendChild(nextTextElement);

      if (direction > 0) {
        gsap.set(nextTextElement, {
          x: "-100%",
          rotationY: 45,
          opacity: 0,
          transformPerspective: 1000,
          transformOrigin: "center center",
        });

        gsap.to(currentTextElement, {
          x: "100%",
          rotationY: -45,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "power2.inOut",
          transformPerspective: 1000,
        });

        gsap.to(nextTextElement, {
          x: "0%",
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformPerspective: 1000,
          onComplete: () => {
            if (currentTextElement.parentNode) {
              currentTextElement.parentNode.removeChild(currentTextElement);
            }
            currentTextElement = nextTextElement;
            currentIndex = nextIndex;
            isAnimating = false;
          },
        });
      } else {
        gsap.set(nextTextElement, {
          x: "100%",
          rotationY: -45,
          opacity: 0,
          scale: 0.8,
          transformPerspective: 1000,
          transformOrigin: "center center",
        });

        gsap.to(currentTextElement, {
          x: "-100%",
          rotationY: 45,
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          transformPerspective: 1000,
        });

        gsap.to(nextTextElement, {
          x: "0%",
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformPerspective: 1000,
          onComplete: () => {
            if (currentTextElement.parentNode) {
              currentTextElement.parentNode.removeChild(currentTextElement);
            }
            currentTextElement = nextTextElement;
            currentIndex = nextIndex;
            isAnimating = false;
          },
        });
      }
    };

    scrollSection.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      scrollSection.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #0D00A8, #0D00A8, #000000, #000000)",
        }}
      >
        <MenuBar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <header className="fixed top-0 left-0 right-0 z-40">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <motion.div
              className="text-white cursor-pointer relative z-[60]"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                className="text-[28px] border-0 bg-transparent cursor-pointer hover:bg-transparent p-2"
              >
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </Button>
            </motion.div>

            <motion.div
              className="text-white text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Logo
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="relative text-white border-white hover:bg-transparent rounded-full px-6 overflow-hidden"
              >
                <span className="relative z-10">Связаться</span>

                <motion.span
                  className="absolute inset-0 bg-white z-0"
                  initial={{ scaleY: 0, originY: 1 }}
                  whileHover={{
                    scaleY: 1,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                />

                <motion.span
                  className="ml-2 relative z-10"
                  initial={{ x: -5 }}
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ExternalLink size={16} />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-4 pt-32 pb-16 min-h-screen flex flex-col">
          <div className="mt-auto mb-24">
            <motion.h1
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold max-w-[800px] leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.3,
                type: "spring",
                stiffness: 50,
              }}
            >
              Технологии, которые работают на вас
            </motion.h1>
          </div>
        </main>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -left-[10%] -top-[10%] w-[50%] h-[50%] rounded-full bg-blue-800/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -right-[10%] -bottom-[10%] w-[60%] h-[60%] rounded-full bg-indigo-800/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            className="text-white/[0.02] text-[20vw] font-bold whitespace-nowrap"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            ТЕХНОЛОГИИ БУДУЩЕГО ТЕХНОЛОГИИ БУДУЩЕГО
          </motion.div>
        </div>
      </div>

      <section
        ref={scrollSectionRef}
        className="relative h-screen bg-black overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 rounded-full bg-indigo-900/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 rounded-full bg-blue-900/5 blur-3xl"></div>
        </div>

        <div
          ref={cubeWrapperRef}
          className="relative h-full w-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        ></div>
      </section>
    </>
  );
}

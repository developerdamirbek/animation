"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { LANGUAGES, MENU_ITEMS } from "@/constants";
import { Button } from "./ui/button";

const socialIcons = [
  { icon: <Facebook size={20} />, href: "#" },
  { icon: <Twitter size={20} />, href: "#" },
  { icon: <Instagram size={20} />, href: "#" },
  { icon: <Linkedin size={20} />, href: "#" },
  { icon: <Youtube size={20} />, href: "#" },
];

export const MenuBar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 bg-[#0D00A8]"
            style={{
              borderBottomLeftRadius: "60%",
              borderBottomRightRadius: "60%",
            }}
            initial={{
              y: "-100%",
              borderBottomLeftRadius: "60%",
              borderBottomRightRadius: "60%",
            }}
            animate={{
              y: "0%",
              borderBottomLeftRadius: "0%",
              borderBottomRightRadius: "0%",
            }}
            exit={{
              y: "-100%",
              borderBottomLeftRadius: "60%",
              borderBottomRightRadius: "60%",
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              borderBottomLeftRadius: {
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3,
              },
              borderBottomRightRadius: {
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3,
              },
            }}
          />

          <motion.div
            className="absolute inset-0 bg-[#3F32DA]"
            style={{
              borderBottomLeftRadius: "100%",
              borderBottomRightRadius: "100%",
            }}
            initial={{
              y: "-100%",
              borderBottomLeftRadius: "100%",
              borderBottomRightRadius: "100%",
            }}
            animate={{
              y: "0%",
              borderBottomLeftRadius: "0%",
              borderBottomRightRadius: "0%",
            }}
            exit={{
              y: "-100%",
              borderRadius: "60%",
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
              borderBottomLeftRadius: {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.45,
              },
              borderBottomRightRadius: {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.45,
              },
            }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: contentVisible ? 0.1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: contentVisible ? 1 : 0,
                  opacity: contentVisible ? [0, 0.5, 0.3] : 0,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  delay: 0.6 + Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="fixed top-0 left-0 right-0 text-white z-50"
            onClick={onClose}
            exit={{ display: "none" }}
          >
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
              <Button
                variant="outline"
                className="text-[28px] border-0 bg-transparent cursor-pointer hover:bg-transparent p-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </motion.div>

          <div className="container">
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex container flex-col items-center space-y-6"
                initial={{ y: -20 }}
                animate={{ y: contentVisible ? 0 : -20 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {MENU_ITEMS.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: contentVisible ? 1 : 0,
                      x: contentVisible ? 0 : -20,
                    }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-white text-3xl font-light hover:text-white/80 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-between items-center space-y-6 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 20,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="container mx-auto flex justify-between items-center">
              <div className="flex space-x-4">
                {LANGUAGES.map((lang, index) => (
                  <motion.button
                    key={index}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: contentVisible ? 1 : 0,
                      y: contentVisible ? 0 : 10,
                    }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    {lang.name}
                  </motion.button>
                ))}
              </div>

              <div className="flex space-x-4">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: contentVisible ? 1 : 0,
                      y: contentVisible ? 0 : 10,
                    }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

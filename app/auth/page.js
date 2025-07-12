"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import AuthBox from "@/components/AuthBox";

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState("login");
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mobile Forms */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          {activeForm === "login" ? (
            <motion.div
              key="mobile-login"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoginPage onSwitch={() => setActiveForm("register")} />
            </motion.div>
          ) : (
            <motion.div
              key="mobile-register"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterPage onSwitch={() => setActiveForm("login")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full h-screen">
        <div className="w-1/2 relative z-10">
          <LoginPage onSwitch={() => setActiveForm("register")} />
        </div>
        <div className="w-1/2 relative z-10">
          <RegisterPage onSwitch={() => setActiveForm("login")} />
        </div>
        
        {/* Image Overlay */}
        <motion.div
          key="auth-image"
          initial={{ x: activeForm === "login" ? "100%" : "0%" }}
          animate={{ x: activeForm === "login" ? "100%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-20 w-1/2 h-screen bg-background"
        >
          <AuthBox />
        </motion.div>
      </div>
    </div>
  );
}
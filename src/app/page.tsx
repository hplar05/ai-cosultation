"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuccessMessage from "@/components/ui/landing/SucessMessage";
import HeroSection from "@/components/ui/landing/HeroSection";
import BenefitsSection from "@/components/ui/landing/BenefitsSection";
import ConsultationForm from "@/components/ui/landing/ConsultationForm";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = async (formData: React.SetStateAction<null>) => {
    // Send to webhook
    try {
      await fetch(
        "http://3.25.74.206:5678/webhook-test/c5ac6a61-99ac-41fa-86bd-06dcc2b7ee69",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setSubmittedData(formData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <SuccessMessage
            key="success"
            data={submittedData}
            onBack={() => setShowSuccess(false)}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <HeroSection />
            <BenefitsSection />
            <ConsultationForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-400 border-t border-white/5">
        <p className="text-sm">
          © 2024 AI Automation Consulting. Transform your business with
          intelligent automation.
        </p>
      </footer>
    </div>
  );
}

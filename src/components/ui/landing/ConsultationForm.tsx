import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";

export default function ConsultationForm({ onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_type: "",
    problem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.business_type ||
      !formData.problem
    ) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation-form" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free AI Consultation
          </h2>
          <p className="text-xl text-gray-300">
            Tell us about your business and we'll create a custom automation
            plan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 h-12 text-lg"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 h-12 text-lg"
                  disabled={isSubmitting}
                />
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <Label
                  htmlFor="business_type"
                  className="text-white font-medium"
                >
                  Business Type *
                </Label>
                <Select
                  value={formData.business_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, business_type: value })
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 text-lg">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS / Software</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="agency">Marketing Agency</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <Label htmlFor="problem" className="text-white font-medium">
                  What Would You Like to Automate? *
                </Label>
                <Textarea
                  id="problem"
                  placeholder="Describe the problem or repetitive tasks you'd like to automate. For example: 'I spend 3 hours daily responding to customer emails' or 'Manual data entry between our CRM and accounting software'..."
                  value={formData.problem}
                  onChange={(e) =>
                    setFormData({ ...formData, problem: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 min-h-32 text-lg resize-none"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-gray-400">
                  Be as detailed as possible to get the best recommendations
                </p>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Get My Free Consultation
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-400">
                No credit card required • Free consultation • Response within 24
                hours
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

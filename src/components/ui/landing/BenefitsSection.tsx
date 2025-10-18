import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Shield, Zap, Brain, BarChart } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Automate repetitive tasks and reclaim hours every day for strategic work",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Scale Faster",
    description:
      "Grow your business without proportionally increasing workload or staff",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description:
      "Leverage cutting-edge AI technology for intelligent decision making",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Reduce Errors",
    description:
      "Eliminate human mistakes with precise, consistent automated processes",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart,
    title: "Data Insights",
    description:
      "Get real-time analytics and insights to make better business decisions",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "See immediate impact with our rapid implementation process",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose AI Automation?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your business operations with intelligent automation
            solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                {/* Icon with gradient */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

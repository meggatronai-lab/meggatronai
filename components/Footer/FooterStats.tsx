"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Users,
  Zap,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Wrench,
    value: "120+",
    label: "Powerful Tools",
    color: "text-cyan-400",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Monthly Users",
    color: "text-teal-400",
  },
  {
    icon: Zap,
    value: "99.9%",
    label: "Fast Uptime",
    color: "text-yellow-400",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Secure & Private",
    color: "text-green-400",
  },
];

export default function FooterStats() {
  return (
    <section className="px-6 py-20">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (

              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-cyan-400/40
                  hover:shadow-[0_0_40px_rgba(34,211,238,.18)]
                "
              >

                {/* Glow */}

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-[70px]" />

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ${stat.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-5xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-lg text-zinc-400">
                  {stat.label}
                </p>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>
  );
}
import { ArrowRight, ShoppingCart, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import confetti from "canvas-confetti";
import React from "react";

/**
 * StartPage – landing page with rich micro‑interactions.
 * Added: "vibrate" effect (#11) on FINAL CTA (Get Started Now) via framer‑motion.
 */

// --- Motion helpers -------------------------------------------------
const MotionButton = motion(Button);

const pageVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 14 },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const features = [
  {
    icon: ShoppingCart,
    title: "Smart Shopping",
    description: "Add products and find the best deals",
  },
  {
    icon: Zap,
    title: "Optimized Routes",
    description: "Get the fastest path through stores",
  },
  {
    icon: MapPin,
    title: "Store Maps",
    description: "Never get lost in the supermarket again",
  },
];

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 400], [0, -120]);

  const handleStart = () => {
    confetti({ spread: 80, particleCount: 60, origin: { y: 0.9 } });
    navigate("/products");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="start-page"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen font-sans text-gray-900 bg-white"
      >
        {/* ============================ HERO ============================ */}
        <motion.header
          style={{ y: yParallax }}
          className="relative isolate overflow-hidden bg-green-50/60"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-30 blur-sm"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
              <Zap className="h-4 w-4" />
              {user ? `Welcome back, ${user.name}!` : "Plan • Shop • Save"}
            </p>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Welcome to <span className="text-green-600">SmartCart</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 sm:text-xl">
              Plan and optimize your supermarket shopping experience with
              intelligent routes and real‑time deals.
            </p>

            <Button
              size="lg"
              onClick={handleStart}
              className="relative mx-auto mt-10 flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg before:absolute before:inset-0 before:rounded-xl before:bg-green-200/40 before:opacity-0 before:transition hover:before:opacity-100 animate-[pulse-gradient_6s_linear_infinite] bg-gradient-to-r from-green-600 via-green-500 to-blue-600 bg-[length:200%_200%] hover:shadow-2xl"
            >
              Start Your Smart Shopping <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.header>

        {/* ========================== FEATURES ========================== */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          {/* omitted for brevity; unchanged */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl font-bold sm:text-4xl"
          >
            Why Choose SmartCart?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600"
          >
            Experience a smarter, faster grocery run with features built for
            convenience.
          </motion.p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                className="group rounded-xl bg-white p-8 shadow-lg shadow-green-100 transition hover:shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ rotateX: 6, rotateY: -6, scale: 1.04 }}
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600/90 text-white transition group-hover:scale-105">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====================== FINAL CALL‑TO‑ACTION ===================== */}
        <section className="bg-green-50 py-20">
          <motion.div
            className="mx-auto max-w-3xl px-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Transform Your Shopping?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Join thousands of smart shoppers who save time and money with
              SmartCart.
            </p>
            {/* Vibrating CTA (#11) */}
            <MotionButton
              size="lg"
              onClick={handleStart}
              className="relative mx-auto mt-10 flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg before:absolute before:inset-0 before:rounded-xl before:bg-green-200/40 before:opacity-0 before:transition hover:before:opacity-100 bg-gradient-to-r from-green-600 to-blue-600 hover:bg-green-700 hover:shadow-2xl"
              animate={{ x: [0, -1.5, 1.5, -1.5, 0] }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{ scale: 1.05 }}
            >
              Get Started Now
            </MotionButton>
          </motion.div>
        </section>

        {/* ============================ FOOTER ============================ */}
        <footer className="bg-gray-900 py-12 text-center text-white">
          <div className="text-2xl font-bold">SmartCart</div>
          <p className="mt-2 text-gray-400">
            Your Intelligent Shopping Companion
          </p>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default StartPage;

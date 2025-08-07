import {
  ArrowRight,
  ShoppingCart,
  Zap,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import confetti from "canvas-confetti";

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

// New testimonials data
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Busy Mom",
    content:
      "SmartCart has completely transformed how I shop. I save hours every week!",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Professional",
    content:
      "The route optimization is incredible. No more wandering around stores aimlessly.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Student",
    content:
      "Perfect for budget shopping. The deal finder has saved me hundreds of dollars!",
    rating: 5,
  },
];

const stats = [
  { icon: Users, number: "50K+", label: "Happy Shoppers" },
  { icon: Clock, number: "30%", label: "Time Saved" },
  { icon: TrendingUp, number: "25%", label: "Money Saved" },
  { icon: Star, number: "4.9", label: "App Rating" },
];

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 400], [0, -120]);
  const yParallaxSlow = useTransform(scrollY, [0, 1000], [0, -150]);

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
        className="min-h-screen font-sans bg-background text-foreground"
      >
        {/* ============================ HERO ============================ */}
        <motion.header
          style={{ y: yParallax }}
          className="relative isolate overflow-hidden bg-green-50/60 "
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-90 blur-sm"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-zinc-900 via-white/70 dark:via-zinc-800 to-transparent" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 shadow-sm">
              <Zap className="h-4 w-4" />
              {user ? `Welcome back, ${user.name}!` : "Plan • Shop • Save"}
            </p>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Welcome to{" "}
              <span className="text-green-600 dark:text-green-400">
                SmartCart
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
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
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl font-bold sm:text-4xl text-foreground"
          >
            Why Choose SmartCart?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400"
          >
            Experience a smarter, faster grocery run with features built for
            convenience.
          </motion.p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                className="group rounded-xl bg-white p-8 shadow-lg shadow-green-100 transition hover:shadow-xl relative overflow-hidden"
                initial={{
                  opacity: 0,
                  y: 100,
                  rotateX: 90,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  rotateX: 6,
                  rotateY: -6,
                  scale: 1.05,
                  z: 50,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                {/* Shimmering gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-green-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-700 rounded-xl" />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-green-400/20 group-hover:via-blue-400/20 group-hover:to-purple-400/20 blur-sm transition-all duration-700" />

                <motion.div
                  className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600/90 text-white transition group-hover:scale-110 shadow-lg"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background:
                      "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)",
                  }}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>

                <h3 className="relative text-xl font-semibold mb-2">{title}</h3>
                <p className="relative mt-2 text-gray-600">{description}</p>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, particle) => (
                    <motion.div
                      key={particle}
                      className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + particle * 30}%`,
                        top: `${30 + particle * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: particle * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================== NEW STATS SECTION ========================== */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border border-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center text-4xl font-bold text-white mb-16"
            >
              Trusted by Thousands
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map(({ icon: Icon, number, label }, i) => (
                <motion.div
                  key={label}
                  className="text-center text-white"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotateY: 90,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 15,
                    z: 50,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  >
                    {number}
                  </motion.div>
                  <div className="text-lg opacity-90">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================== NEW TESTIMONIALS SECTION ========================== */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          {/* Subtle background pattern */}
          <motion.div
            style={{ y: yParallaxSlow }}
            className="absolute inset-0 opacity-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100" />
          </motion.div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0
                    ? "bg-green-200"
                    : i % 3 === 1
                    ? "bg-blue-200"
                    : "bg-purple-200"
                } opacity-10`}
                style={{
                  width: `${30 + i * 8}px`,
                  height: `${30 + i * 8}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center text-4xl font-bold mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              What Our Users Say
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group"
                  initial={{
                    opacity: 0,
                    y: 100,
                    rotateX: 45,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-green-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-700 rounded-2xl" />

                  <div className="relative z-10">
                    <motion.div
                      className="flex mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {[...Array(testimonial.rating)].map((_, star) => (
                        <motion.div
                          key={star}
                          initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: -180,
                          }}
                          whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                          }}
                          transition={{
                            delay: 0.5 + star * 0.1 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      className="text-gray-700 mb-6 italic leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      "{testimonial.content}"
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, particle) => (
                      <motion.div
                        key={particle}
                        className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          left: `${15 + particle * 20}%`,
                          top: `${20 + particle * 15}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: particle * 0.4,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== FINAL CALL‑TO‑ACTION ===================== */}
        <section className="bg-green-50 dark:bg-zinc-900 py-20">
          <motion.div
            className="mx-auto max-w-3xl px-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
              Ready to Transform Your Shopping?
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
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

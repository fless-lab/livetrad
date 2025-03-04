"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Globe, Zap, Users } from "lucide-react"

const achievements = [
  { icon: <Globe className="w-6 h-6" />, label: "Languages Supported", value: "50+" },
  { icon: <Zap className="w-6 h-6" />, label: "Translation Speed", value: "<1s" },
  { icon: <Users className="w-6 h-6" />, label: "Active Users", value: "1000+" },
  { icon: <Award className="w-6 h-6" />, label: "Accuracy Rate", value: "95%" },
]

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="grid md:grid-cols-2 gap-12 items-center" style={{ y, opacity }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="drannel"
              width={600}
              height={600}
              className="rounded-3xl relative z-10"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About LiveTrad</h2>
            <p className="text-lg mb-6 text-zinc-300">
              LiveTrad is not just a translation tool; it's a communication bridge that connects people across language
              barriers. With cutting-edge AI technology, LiveTrad provides real-time translation for any audio source,
              making global communication seamless and accessible.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Whether you're in an international meeting, watching a foreign video, or trying to understand a podcast in
              another language, LiveTrad's browser extension and desktop app work together to deliver accurate
              translations instantly.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="bg-zinc-900/50 rounded-lg p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">{achievement.icon}</div>
                    <div className="text-2xl font-bold">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


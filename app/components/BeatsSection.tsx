import type React from "react"
;('"use client')

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Headphones, Mic2, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useInView } from "react-intersection-observer"

interface Feature {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  image: string
}

export default function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    // Simulated API call
    setTimeout(() => {
      setFeatures([
        {
          id: "1",
          name: "Browser Extension",
          description: "Connect to any audio source directly from your browser",
          icon: <Globe className="w-6 h-6" />,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "2",
          name: "Desktop Application",
          description: "Receive translated audio in real-time on your desktop",
          icon: <Headphones className="w-6 h-6" />,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "3",
          name: "Multi-platform Support",
          description: "Works with meetings, videos, podcasts, and more",
          icon: <Mic2 className="w-6 h-6" />,
          image: "/placeholder.svg?height=200&width=200",
        },
      ])
      setLoading(false)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section id="features" className="py-20" ref={ref}>
      <motion.h2
        className="text-5xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Key Features
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {loading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="bg-gray-900 border-blue-500">
                  <CardContent className="p-6">
                    <Skeleton className="h-40 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
          : features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-gray-900 border-blue-500 hover:border-blue-400 transition-colors">
                  <CardContent className="p-6">
                    <div className="relative h-40 bg-blue-900 rounded-md overflow-hidden mb-4">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white text-blue-900 p-3 rounded-full">{feature.icon}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{feature.name}</h3>
                    <p className="text-zinc-400 mb-4">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <a href="#download" rel="noopener noreferrer">
                        Learn More <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
      </motion.div>
    </section>
  )
}


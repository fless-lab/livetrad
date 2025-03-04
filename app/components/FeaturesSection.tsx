"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Headphones, Mic2, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useInView } from "react-intersection-observer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface Feature {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  image: string
  detailedDescription: string
  benefits: string[]
}

export default function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true
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
          detailedDescription:
            "Our browser extension seamlessly integrates with your favorite browsers including Chrome, Firefox, Safari, and Edge. It captures audio from any tab or application and sends it to our AI translation engine. Perfect for online meetings, webinars, YouTube videos, and more.",
          benefits: [
            "Works with all major browsers",
            "One-click audio capture",
            "Minimal CPU usage",
            "Automatic source language detection",
            "Secure end-to-end encryption",
          ],
        },
        {
          id: "2",
          name: "Desktop Application",
          description: "Receive translated audio in real-time on your desktop",
          icon: <Headphones className="w-6 h-6" />,
          image: "/placeholder.svg?height=200&width=200",
          detailedDescription:
            "The LiveTrad desktop application is the command center for your translation needs. It receives the audio captured by the browser extension, processes it through our advanced AI models, and outputs the translated audio in your preferred language with natural-sounding voices.",
          benefits: [
            "Available for Windows, macOS, and Linux",
            "Customizable voice options",
            "Adjustable translation speed",
            "Text transcript alongside audio",
            "Save translations for later reference",
          ],
        },
        {
          id: "3",
          name: "Multi-platform Support",
          description: "Works with meetings, videos, podcasts, and more",
          icon: <Mic2 className="w-6 h-6" />,
          image: "/placeholder.svg?height=200&width=200",
          detailedDescription:
            "LiveTrad is designed to work across all platforms and content types. Whether you're in a Zoom meeting, watching a foreign language YouTube video, or listening to an international podcast, LiveTrad provides real-time translation without missing a beat.",
          benefits: [
            "Compatible with all major meeting platforms",
            "Works with streaming services",
            "Podcast integration",
            "Educational content support",
            "Live event translation capabilities",
          ],
        },
      ])
      setLoading(false)
    }, 1500)
  }

  const handleLearnMore = (feature: Feature) => {
    setSelectedFeature(feature)
    setIsDialogOpen(true)
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
    <>
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
                  <Card key={index} className="bg-gray-900 border-gray-800">
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
                  <Card className="bg-gradient-to-br from-zinc-900 to-black border-cyan-900/30 hover:border-cyan-700/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="relative h-40 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-md overflow-hidden mb-4">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.name}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-3 rounded-full">
                            {feature.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">{feature.name}</h3>
                      <p className="text-zinc-400 mb-4">{feature.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-0"
                        onClick={() => handleLearnMore(feature)}
                      >
                        Learn More <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </motion.div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-zinc-900 to-black border-cyan-900/30">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {selectedFeature?.icon && (
                <span className="mr-2 bg-gradient-to-br from-cyan-500 to-purple-600 p-2 rounded-full inline-flex">
                  {selectedFeature.icon}
                </span>
              )}
              {selectedFeature?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">{selectedFeature?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-zinc-300 mb-4">{selectedFeature?.detailedDescription}</p>
            <h4 className="font-semibold text-lg mb-2 text-white">Key Benefits</h4>
            <ul className="space-y-2">
              {selectedFeature?.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-zinc-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-0">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


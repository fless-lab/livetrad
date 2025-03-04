"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import md5 from "crypto-js/md5"

interface AuthorSectionProps {
  email?: string
  name?: string
  role?: string
  bio?: string
  socialLinks?: {
    github?: string
    twitter?: string
    linkedin?: string
    email?: string
  }
}

export default function AuthorSection({
  email = "achilleatarmla@gmail.com",
  name = "Abdou-Raouf ATARMLA",
  role = "Software & Machine Learning Engineer",
  bio = "Passionate about breaking language barriers with technology. LiveTrad is my solution to make real-time translation accessible to everyone.",
  socialLinks = {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "mailto:achilleatarmla@gmail.com",
  },
}: AuthorSectionProps) {
  const [gravatarUrl, setGravatarUrl] = useState("")

  useEffect(() => {
    // Generate Gravatar URL from email
    const hash = md5(email.trim().toLowerCase()).toString()
    setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`)
  }, [email])

  return (
    <section id="author" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About the Author
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-cyan-900/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-6 flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white/10">
                    {gravatarUrl && (
                      <Image src={gravatarUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-center">{name}</h3>
                  <p className="text-cyan-400 text-center mb-4">{role}</p>

                  <div className="flex space-x-4 mt-2">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {socialLinks.email && (
                      <a href={socialLinks.email} className="text-zinc-400 hover:text-white transition-colors">
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3 p-8">
                  <h4 className="text-xl font-semibold mb-4">The Story Behind LiveTrad</h4>
                  <p className="text-zinc-300 mb-4">{bio}</p>
                  <p className="text-zinc-300">
                    With a background in software engineering, self taught machine learning and a passion for connecting people across
                    cultures, I created LiveTrad to solve a real problem I encountered in international meetings and
                    conferences. The combination of a browser extension and desktop app provides a seamless experience
                    that works across all platforms and content types.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


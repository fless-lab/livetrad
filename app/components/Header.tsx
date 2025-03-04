"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tighter">
          LiveTrad
        </Link>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </Button>
        </div>
        <nav
          className={`${isMenuOpen ? "block" : "hidden"} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li>
              <Link href="#features" className="hover:text-cyan-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-cyan-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button asChild variant="outline" className="hidden md:block border-cyan-700/50 hover:border-cyan-500">
          <a href="#download" rel="noopener noreferrer">
            Download
          </a>
        </Button>
      </div>
    </header>
  )
}


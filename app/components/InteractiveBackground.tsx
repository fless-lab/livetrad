"use client"

import { useEffect, useRef } from "react"

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller than viewport to cover scrolling
    }
    handleResize()

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      originalY: number

      constructor() {
        // Distribute particles across the entire height of the canvas
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalY = this.y // Store original Y position
        this.size = Math.random() * 3 + 1
        
        // Increase speed range and ensure more varied movement
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1

        // Cyan to purple color range
        const hue = Math.random() * 60 + 180
        this.alpha = Math.random() * 0.5 + 0.1
        this.color = `hsla(${hue}, 80%, 70%, ${this.alpha})`
      }

      update(scrollY: number) {
        // Movement
        this.x += this.speedX
        this.y += this.speedY

        // Calculate visible position with reduced parallax effect
        // This makes particles move more naturally with scroll
        const visibleY = this.y - scrollY * 0.3 // Reduced parallax effect

        // Mouse influence (enhanced attraction)
        const dx = mouseX - this.x
        const dy = mouseY - visibleY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) { // Increased influence radius
          this.speedX += dx * 0.0003
          this.speedY += dy * 0.0003
        }

        // Add slight gravity effect to make particles float more naturally
        this.speedY += 0.01 * (Math.random() - 0.5)
        
        // Add some randomness to movement
        if (Math.random() < 0.01) {
          this.speedX += (Math.random() - 0.5) * 0.3
          this.speedY += (Math.random() - 0.5) * 0.3
        }
        
        // Dampen speed to prevent excessive movement
        this.speedX *= 0.99
        this.speedY *= 0.99

        // Boundary check with bounce
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1
        }

        // Vertical boundary check
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1
        }
      }

      draw(scrollY: number) {
        // Calculate visible position with reduced parallax effect to match update method
        const visibleY = this.y - scrollY * 0.3 // Reduced parallax effect

        // Only draw if particle is within the viewport (extended range)
        if (visibleY > -200 && visibleY < window.innerHeight + 200) {
          ctx!.beginPath()
          ctx!.arc(this.x, visibleY, this.size, 0, Math.PI * 2)
          ctx!.fillStyle = this.color
          ctx!.fill()
          
          // Add subtle glow effect
          ctx!.beginPath()
          ctx!.arc(this.x, visibleY, this.size * 2, 0, Math.PI * 2)
          ctx!.fillStyle = this.color.replace("${this.alpha}", `${this.alpha * 0.3}`)
          ctx!.fill()
        }
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 200 // Increased particle count for better effect

    // Initialize particles
    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      const scrollY = window.scrollY

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles) {
        particle.update(scrollY)
        particle.draw(scrollY)
      }

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const visibleY1 = particles[i].y - scrollY * 0.3
          const visibleY2 = particles[j].y - scrollY * 0.3

          // Only process if both particles are near the viewport
          if (
            visibleY1 < -200 ||
            visibleY1 > window.innerHeight + 200 ||
            visibleY2 < -200 ||
            visibleY2 > window.innerHeight + 200
          ) {
            continue
          }

          const dx = particles[i].x - particles[j].x
          const dy = visibleY1 - visibleY2
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, visibleY1)
            ctx.lineTo(particles[j].x, visibleY2)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    // Handle touch movement for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = event.touches[0].clientX
        mouseY = event.touches[0].clientY
      }
    }

    // Handle scroll
    const handleScroll = () => {
      // No need to do anything here as we're using window.scrollY in the animation loop
    }

    // Initialize and start animation
    initParticles()
    animate()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />
}

export default InteractiveBackground


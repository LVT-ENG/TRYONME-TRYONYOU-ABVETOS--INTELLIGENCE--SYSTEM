import React, { useEffect, useRef } from 'react'

function Sparkles({ trigger = false, intensity = 30 }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 4 - 2
        this.speedY = Math.random() * 4 - 2
        this.life = 1
        this.decay = Math.random() * 0.02 + 0.01
        this.color = Math.random() > 0.5 ? '#D3B26A' : '#0E6B6B'
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += 0.1 // gravity
        this.life -= this.decay
        this.rotation += this.rotationSpeed
      }

      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.life
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Draw sparkle shape
        ctx.fillStyle = this.color
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        
        // Star shape
        const spikes = 4
        const outerRadius = this.size
        const innerRadius = this.size / 2

        ctx.beginPath()
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (Math.PI / spikes) * i
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()

        ctx.restore()
      }

      isDead() {
        return this.life <= 0
      }
    }

    const createSparkles = (x, y, count) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(x, y))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update()
        particle.draw(ctx)
        return !particle.isDead()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Add click/touch event listeners
    const handleInteraction = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX)
      const y = e.clientY || (e.touches && e.touches[0].clientY)
      if (x && y) {
        createSparkles(x, y, intensity)
      }
    }

    canvas.addEventListener('click', handleInteraction)
    canvas.addEventListener('touchstart', handleInteraction)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('click', handleInteraction)
      canvas.removeEventListener('touchstart', handleInteraction)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity])

  // Trigger sparkles programmatically
  useEffect(() => {
    if (trigger && canvasRef.current) {
      const canvas = canvasRef.current
      const x = canvas.width / 2
      const y = canvas.height / 2
      
      for (let i = 0; i < intensity; i++) {
        particlesRef.current.push(
          new (class Particle {
            constructor(x, y) {
              this.x = x
              this.y = y
              this.size = Math.random() * 3 + 1
              this.speedX = Math.random() * 4 - 2
              this.speedY = Math.random() * 4 - 2
              this.life = 1
              this.decay = Math.random() * 0.02 + 0.01
              this.color = Math.random() > 0.5 ? '#D3B26A' : '#0E6B6B'
              this.rotation = Math.random() * Math.PI * 2
              this.rotationSpeed = (Math.random() - 0.5) * 0.2
            }
          })(x, y)
        )
      }
    }
  }, [trigger, intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default Sparkles

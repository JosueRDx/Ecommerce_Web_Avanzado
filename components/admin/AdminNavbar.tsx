import React, { useContext, useEffect, useRef } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { UiContext } from '../../context'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const AdminNavbar = () => {

  const { toggleSideMenu } = useContext(UiContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      twinkle: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 70 // Altura del navbar
    }

    const createParticles = () => {
      const particleCount = 50 // Menos partículas para el navbar
      particles.length = 0

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.6 + 0.1,
          twinkle: Math.random() * 0.015 + 0.005
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speed
        particle.opacity += Math.sin(Date.now() * particle.twinkle) * 0.01

        if (particle.x > canvas.width) {
          particle.x = -particle.size
          particle.y = Math.random() * canvas.height
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(0.4, particle.opacity))})`
        ctx.shadowBlur = particle.size * 2
        ctx.shadowColor = 'white'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#000000',
        boxShadow: '0 2px 20px rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Canvas para las partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Toolbar sx={{ minHeight: '70px', px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <NextLink
          href='/'
          passHref
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            transition: 'transform 0.2s ease'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': {
                transform: 'scale(1.08)'
              }
            }}
          >
            <Image
              src='/logo/logo-name.png'
              alt='Oh-la-la-Shoes'
              width='50'
              height='50'
              style={{ 
                borderRadius: '50%',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)'
              }}
            />
            <Typography 
              sx={{ 
                ml: 1,
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.05em'
              }}
            >
              Regresar a la tienda
            </Typography>
          </Box>
        </NextLink>
        
        <Box flex={1} />
        
        <Button
          onClick={toggleSideMenu}
          aria-label='menu open and close'
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            px: 2,
            py: 1,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.9rem',
            ml: 1,
            transition: 'all 0.3s ease',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNavbar
import { NextPage } from 'next'
import { Typography, Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import ShopLayout from '../components/layouts/ShopLayout'
import ProductList from '../components/products/ProductList'
import { useProducts } from '../hooks'
import FullScreenLoading from '../components/ui/FullScreenLoading'

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')
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
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = 150
      particles.length = 0

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 0.02 + 0.01
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.y -= particle.speed
        particle.opacity += Math.sin(Date.now() * particle.twinkle) * 0.01

        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, particle.opacity))})`
        ctx.shadowBlur = particle.size * 3
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
    <ShopLayout
      title={'ANGELOUS | Inicio'}
      pageDescription='Encuentra las mejores zapatillas al mejor precio'
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Canvas para las partículas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, padding: 3 }}>
          <Typography
            variant='h1'
            component='h1'
            sx={{
              my: 1,
              color: 'white',
              textAlign: 'center',
              fontSize: { xs: '3rem', md: '4rem' },
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em',
              background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}
          >
            ANGELOUS
          </Typography>

          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 3,
              color: 'white',
              textAlign: 'center',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'medium',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.05em',
              opacity: 0.9
            }}
          >
            Productos:
          </Typography>

          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
              }}
            >
              <FullScreenLoading />
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                '& .MuiCard-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)'
                  }
                },
                '& .MuiTypography-root': {
                  color: 'white'
                }
              }}
            >
              <ProductList products={products} />
            </Box>
          )}
        </Box>

        <style jsx global>{`
          @keyframes glow {
            from {
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 
                          0 0 30px rgba(255, 255, 255, 0.6), 
                          0 0 40px rgba(255, 255, 255, 0.4);
            }
            to {
              text-shadow: 0 0 25px rgba(255, 255, 255, 1), 
                          0 0 35px rgba(255, 255, 255, 0.8), 
                          0 0 45px rgba(255, 255, 255, 0.6);
            }
          }
          
          body {
            background-color: #000000 !important;
          }
        `}</style>
      </Box>
    </ShopLayout>
  )
}

export default HomePage
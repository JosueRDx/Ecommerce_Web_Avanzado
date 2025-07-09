import React, { useContext, useState, useEffect, useRef } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CartContext, UiContext } from '../../context'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Toolbar, Typography } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { ClearOutlined } from '@mui/icons-material'

const Navbar = () => {
  const { asPath, push } = useRouter()
  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${ searchTerm }`)
  }

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
        {/* Logo Section */}
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
              width='60'
              height='60'
              style={{ 
                borderRadius: '50%',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)'
              }}
            />
          </Box>
        </NextLink>

        <Box flex={1} />

        {/* Navigation Menu */}
        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <NextLink href='/category/men' passHref>
            <Button
              aria-label='go to men category'
              sx={{
                color: asPath === '/category/men' ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'transparent',
                borderBottom: asPath === '/category/men' ? '3px solid #fff' : '3px solid transparent',
                borderRadius: '0',
                px: 2.5,
                py: 1.5,
                fontWeight: asPath === '/category/men' ? 700 : 500,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 'auto',
                transition: 'all 0.3s ease',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#fff',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Hombre
            </Button>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Button
              aria-label='go to women category'
              sx={{
                color: asPath === '/category/women' ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'transparent',
                borderBottom: asPath === '/category/women' ? '3px solid #fff' : '3px solid transparent',
                borderRadius: '0',
                px: 2.5,
                py: 1.5,
                fontWeight: asPath === '/category/women' ? 700 : 500,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 'auto',
                transition: 'all 0.3s ease',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#fff',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Mujer
            </Button>
          </NextLink>
          <NextLink href='/category/unisex' passHref>
            <Button
              aria-label='go to unisex category'
              sx={{
                color: asPath === '/category/unisex' ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'transparent',
                borderBottom: asPath === '/category/unisex' ? '3px solid #fff' : '3px solid transparent',
                borderRadius: '0',
                px: 2.5,
                py: 1.5,
                fontWeight: asPath === '/category/unisex' ? 700 : 500,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 'auto',
                transition: 'all 0.3s ease',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#fff',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Unisex
            </Button>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Button
              aria-label='go to kid category'
              sx={{
                color: asPath === '/category/kid' ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'transparent',
                borderBottom: asPath === '/category/kid' ? '3px solid #fff' : '3px solid transparent',
                borderRadius: '0',
                px: 2.5,
                py: 1.5,
                fontWeight: asPath === '/category/kid' ? 700 : 500,
                fontSize: '1rem',
                textTransform: 'none',
                minWidth: 'auto',
                transition: 'all 0.3s ease',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#fff',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Niños
            </Button>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* Search Section */}
        {
          isSearchVisible ?
            (
              <Input
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'white',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white'
                  },
                  '& input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
                className='fadeIn'
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                type='text'
                placeholder='Search...'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                      aria-label='search product by word'
                      sx={{ color: 'white' }}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            :
            (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                className='fadeIn'
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                  }
                }}
                aria-label='search button by word'
              >
                <SearchOutlinedIcon />
              </IconButton>
            )
        }

        {/* Mobile Search Button */}
        <IconButton
          sx={{ 
            display: { xs: 'flex', sm: 'none' },
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            mx: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
            }
          }}
          onClick={toggleSideMenu}
          aria-label='search product by word'
        >
          <SearchOutlinedIcon />
        </IconButton>

        {/* Cart Button */}
        <NextLink href='/cart' passHref>
          <IconButton 
            aria-label='go to shopping cart'
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              mx: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            <Badge 
              badgeContent={numberOfItems} 
              color='secondary'
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4444',
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)'
                }
              }}
            >
              <ShoppingCartOutlinedIcon aria-label='amount of items in shopping cart' />
            </Badge>
          </IconButton>
        </NextLink>

        {/* Menu Button */}
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

export default Navbar
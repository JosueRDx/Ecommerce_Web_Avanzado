import { Box, Typography } from '@mui/material'
import React from 'react'

const FooterShopLayout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px 30px',
        position: 'relative',
        background: '#000000',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 2px, transparent 2px),
            radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 1.5px, transparent 1.5px),
            radial-gradient(circle at 50% 60%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.12) 2.5px, transparent 2.5px),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.06) 1px, transparent 1px),
            radial-gradient(circle at 15% 70%, rgba(255,255,255,0.09) 1.8px, transparent 1.8px),
            radial-gradient(circle at 85% 25%, rgba(255,255,255,0.11) 1.2px, transparent 1.2px),
            radial-gradient(circle at 40% 10%, rgba(255,255,255,0.07) 1.6px, transparent 1.6px),
            radial-gradient(circle at 60% 90%, rgba(255,255,255,0.13) 2.2px, transparent 2.2px),
            radial-gradient(circle at 25% 55%, rgba(255,255,255,0.05) 0.8px, transparent 0.8px)
          `,
          backgroundSize: '200px 200px, 150px 150px, 180px 180px, 220px 220px, 160px 160px, 190px 190px, 170px 170px, 210px 210px, 140px 140px, 230px 230px',
          animation: 'floatParticles1 25s ease-in-out infinite, floatParticles2 30s ease-in-out infinite reverse',
          zIndex: 1
        },
        '&::after': {
          content: '"ANGELOUS"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: '80px', sm: '120px', md: '150px' },
          fontWeight: '900',
          color: 'rgba(255, 255, 255, 0.02)',
          letterSpacing: '10px',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          fontFamily: 'Arial, sans-serif'
        },
        '@keyframes floatParticles1': {
          '0%': {
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
            opacity: 1
          },
          '25%': {
            transform: 'translateY(-30px) translateX(20px) rotate(90deg)',
            opacity: 0.7
          },
          '50%': {
            transform: 'translateY(-15px) translateX(-10px) rotate(180deg)',
            opacity: 0.4
          },
          '75%': {
            transform: 'translateY(-40px) translateX(25px) rotate(270deg)',
            opacity: 0.8
          },
          '100%': {
            transform: 'translateY(0px) translateX(0px) rotate(360deg)',
            opacity: 1
          }
        },
        '@keyframes floatParticles2': {
          '0%': {
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: 0.8
          },
          '33%': {
            transform: 'translateY(-20px) translateX(-15px) scale(1.1)',
            opacity: 0.5
          },
          '66%': {
            transform: 'translateY(-35px) translateX(30px) scale(0.9)',
            opacity: 0.9
          },
          '100%': {
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: 0.8
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant='h2' 
          component='h2' 
          my={3}
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            color: '#ffffff',
            textAlign: 'center',
            letterSpacing: '2px',
            textShadow: '0 2px 8px rgba(255,255,255,0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.2))'
          }}
        >
          <strong>ANGELOUS</strong>
        </Typography>
        <Typography 
          mb={2}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 400,
            letterSpacing: '0.5px',
            textShadow: '0 1px 3px rgba(255,255,255,0.1)'
          }}
        >
          &copy; {currentYear} - Todos los derechos Reservados - Creado por Angelous Zegarra
        </Typography>
      </Box>
    </Box>
  )
}

export default FooterShopLayout
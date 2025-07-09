import NextLink from 'next/link'

import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import ShopLayout from '../../components/layouts/ShopLayout'

const EmptyPage = () => {
  return (
    <ShopLayout
      title='Empty Shopping Cart'
      pageDescription='No items in the shopping cart'
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 200px)'
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            position: 'relative',
            zIndex: 1,
            gap: 4
          }}
        >
          <RemoveShoppingCartOutlined
            sx={{
              fontSize: 100,
              color: 'white',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))',
              animation: 'iconGlow 2s ease-in-out infinite alternate'
            }}
          />
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap='12px'
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 'medium',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.05em',
                textAlign: 'center',
                mb: 2
              }}
            >
              No tiene nada aqui Chupapi
            </Typography>
            <NextLink href='/' passHref>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                  }
                }}
              >
                Regresar a la Tienda
              </Typography>
            </NextLink>
          </Box>
        </Box>

        <style jsx global>{`
          @keyframes iconGlow {
            from {
              filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
            }
            to {
              filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
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

export default EmptyPage
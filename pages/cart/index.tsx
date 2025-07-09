import { useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import { CartContext } from '../../context'

import ShopLayout from '../../components/layouts/ShopLayout'
import CartList from '../../components/cart/CartList'
import OrderSummary from '../../components/cart/OrderSummary'

const CartPage = () => {

  const { isLoaded, cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }

  }, [isLoaded, cart, router])

  if (!isLoaded || cart.length === 0) {
    return (<></>)
  }

  return (
    <ShopLayout
      title='Shopping Cart'
      pageDescription='Store shopping cart'
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, padding: 3 }}>
          <Typography 
            variant='h1' 
            component='h1' 
            sx={{
              my: 4,
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
            Carrito de Compras
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  padding: 2,
                  '& .MuiTypography-root': {
                    color: 'white'
                  },
                  '& .MuiCard-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <CartList editable />
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={5}>
              <Card 
                className='summary-card'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                <CardContent>
                  <Typography 
                    variant='h2' 
                    sx={{
                      mb: 3,
                      color: 'white',
                      textAlign: 'center',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      fontWeight: 'bold',
                      textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.4)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Orden
                  </Typography>
                  
                  <Divider 
                    sx={{ 
                      my: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }} 
                  />
                  
                  <Box
                    sx={{
                      '& .MuiTypography-root': {
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                      }
                    }}
                  >
                    <OrderSummary />
                  </Box>
                  
                  <Box sx={{ mt: 3 }}>
                    <Button
                      color='secondary'
                      className='circular-btn'
                      fullWidth
                      aria-label='checkout'
                      href='/checkout/address'
                      sx={{
                        py: 1,
                        textTransform: 'uppercase',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                          textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                        }
                      }}
                    >
                      Verificar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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

export default CartPage
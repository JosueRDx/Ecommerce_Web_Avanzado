import { FC, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip } from '@mui/material'
import { IProduct } from '../../interfaces'

interface Props {
  product: IProduct
}

const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Grid 
      item 
      xs={12} 
      sm={6} 
      md={4}
      lg={3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ display: 'flex' }}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <NextLink href={`/product/${product.slug}`} passHref style={{ textDecoration: 'none' }}>
          <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                height: 280,
                width: '100%',
                background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
              }}
            >
              <CardMedia
                component='img'
                className='fadeIn'
                image={product.images[0]}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  opacity: isImageLoaded ? 1 : 0,
                }}
              />
              
              {/* Overlay gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                  zIndex: 2,
                }}
              />
              
              {/* Stock indicator */}
              {product.inStock === 0 && (
                <Chip
                  label="AGOTADO"
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(244, 67, 54, 0.9)',
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                    zIndex: 3,
                  }}
                />
              )}
              
              {/* Low stock indicator */}
              {product.inStock > 0 && product.inStock <= 5 && (
                <Chip
                  label={`¡Solo ${product.inStock}!`}
                  color="warning"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(255, 152, 0, 0.9)',
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                    zIndex: 3,
                  }}
                />
              )}
            </Box>
            
            <Box
              sx={{
                p: 2,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                  mb: 1,
                  lineHeight: 1.3,
                  transition: 'all 0.3s ease',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: '2.6em',
                }}
              >
                {product.title}
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#ffffff !important',
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    textShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)',
                    filter: 'brightness(1.5) contrast(1.2)',
                    textDecoration: 'none',
                  }}
                >
                  ${product.price}
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                    }}
                  >
                    {product.gender}
                  </Typography>
                  
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: product.inStock > 5 ? '#4caf50' : product.inStock > 0 ? '#ff9800' : '#f44336',
                      boxShadow: `0 0 10px ${product.inStock > 5 ? '#4caf50' : product.inStock > 0 ? '#ff9800' : '#f44336'}50`,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </CardActionArea>
        </NextLink>
      </Card>
    </Grid>
  )
}

export default ProductCard
import React, { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

import { CartContext } from '../../context'

import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { IProduct, ISize } from '../../interfaces'
import { ICartProduct } from '../../interfaces/cart'
import ShopLayout from '../../components/layouts/ShopLayout'
import ProductSlideshow from '../../components/products/ProductSlideshow'
import ItemCounter from '../../components/ui/ItemCounter'
import SizeSelector from '../../components/products/SizeSelector'
import { dbProducts } from '../../database'

interface ProductPageProps {
  product: IProduct
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {

  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>(
    {
      _id: product._id,
      image: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1
    }
  )

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return
    }

    addProductToCart(tempCartProduct)
    router.push('/cart')
  }

  return (
    <ShopLayout
      title={product.title}
      pageDescription={product.title}
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
          <Grid container spacing={3} my={3}>
            <Grid item xs={12} sm={7}>
              <ProductSlideshow images={product.images} />
            </Grid>
            
            <Grid item xs={12} sm={5}>
              <Box 
                display='flex' 
                flexDirection='column'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  padding: 3,
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography 
                  variant='h1' 
                  component='h1'
                  sx={{
                    color: 'white',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 'bold',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)',
                    letterSpacing: '0.05em',
                    mb: 2,
                    background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {product.title}
                </Typography>
                
                <Typography 
                  variant='subtitle1'
                  sx={{
                    color: '#4ecdc4',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 15px rgba(78, 205, 196, 0.8)',
                    mb: 2
                  }}
                >
                  ${product.price}
                </Typography>
                
                <Box sx={{ my: 2 }}>
                  <Typography 
                    variant='subtitle2'
                    sx={{
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 'medium',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                      mb: 1
                    }}
                  >
                    Cantidad
                  </Typography>
                  
                  <Box
                    sx={{
                      mb: 2,
                      '& .MuiTypography-root': {
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                      },
                      '& .MuiButton-root': {
                        color: 'black',
                        backgroundColor: 'white',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        minWidth: '40px',
                        height: '40px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderColor: 'white',
                          transform: 'scale(1.05)',
                          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
                        }
                      },
                      '& .MuiTextField-root': {
                        '& input': {
                          color: 'white',
                          textAlign: 'center',
                          fontSize: '1.1rem',
                          fontWeight: 'bold'
                        }
                      }
                    }}
                  >
                    <ItemCounter
                      currentValue={tempCartProduct.quantity}
                      updatedQuantity={onUpdateQuantity}
                      maxValue={product.inStock > 5 ? 5 : product.inStock}
                    />
                  </Box>
                  
                  <Box
                    sx={{
                      mt: 2,
                      '& .MuiTypography-root': {
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        fontSize: '1rem',
                        fontWeight: 'medium',
                        mb: 1
                      },
                      '& .MuiButton-root': {
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        minWidth: '45px',
                        height: '45px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        margin: '0 4px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderColor: 'white',
                          transform: 'scale(1.05)',
                          boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                        },
                        '&.Mui-disabled': {
                          color: 'rgba(255, 255, 255, 0.3)',
                          borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&.selected': {
                          backgroundColor: 'white',
                          color: 'black',
                          borderColor: 'white',
                          boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
                          transform: 'scale(1.1)'
                        }
                      }
                    }}
                  >
                    <SizeSelector
                      sizes={product.sizes}
                      selectedSize={tempCartProduct.size}
                      onSelectedSize={selectedSize}
                    />
                  </Box>
                </Box>
                
                {
                  (product.inStock > 0) ?
                    (
                      <Button
                        color='secondary'
                        className='circular-btn'
                        onClick={onAddProduct}
                        aria-label='select a size and the add to cart'
                        sx={{
                          py: 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease',
                          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                            textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                          }
                        }}
                      >
                        {
                          tempCartProduct.size
                            ? 'Agregar al carrito'
                            : 'Selecciona una talla'
                        }
                      </Button>
                    )
                    : (
                      <Chip 
                        label='Sin stock' 
                        color='error' 
                        variant='filled'
                        sx={{
                          backgroundColor: 'rgba(255, 0, 0, 0.2)',
                          color: 'white',
                          border: '1px solid rgba(255, 0, 0, 0.5)',
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}
                      />
                    )
                }
                
                <Box sx={{ mt: 3 }}>
                  <Typography 
                    variant='subtitle2' 
                    sx={{
                      my: 1,
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    Descripción
                  </Typography>
                  <Typography 
                    variant='body2'
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <style jsx global>{`
          body {
            background-color: #000000 !important;
          }
        `}</style>
      </Box>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProdcutsSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage
import { NextPage } from 'next'
import { Typography } from '@mui/material'
import ShopLayout from '../../components/layouts/ShopLayout'
import ProductList from '../../components/products/ProductList'
import { useProducts } from '../../hooks'
import FullScreenLoading from '../../components/ui/FullScreenLoading'

const UnisexPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?gender=unisex')

  return (
    <ShopLayout
      title={ 'ANGELOUS | Unisex' }
      pageDescription='Find the best shoes at the best price for unisex gender'
    >
      <>
        <Typography variant='h1' component='h1'>
          UNISEX
        </Typography>
        <Typography variant='h2' component='h2' sx={ { mb: 1 } }>
          ANGELOUS LE SABE!
        </Typography>
        {
          isLoading ?
            <FullScreenLoading />
            :
            <ProductList products={ products } />
        }
      </>
    </ShopLayout>
  )
}

export default UnisexPage
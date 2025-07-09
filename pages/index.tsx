import { NextPage } from 'next'
import { Typography } from '@mui/material'
import ShopLayout from '../components/layouts/ShopLayout'
import ProductList from '../components/products/ProductList'
import { useProducts } from '../hooks'
import FullScreenLoading from '../components/ui/FullScreenLoading'

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout
      title={ 'ANGELOUS | Inicio' }
      pageDescription='Encuentra las mejores zapatillas al mejor precio'
    >
      <>
        <Typography variant='h1' component='h1' my={ 1 }>
          ANGELOUS
        </Typography>
        <Typography variant='h2' component='h2' sx={ { mb: 2 } }>
          Productos:
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

export default HomePage

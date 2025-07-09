import { Box, Typography } from '@mui/material'
import React from 'react'

const FooterShopLayout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      sx={ {
        margin: '0px auto',
        maxWidth: '1440px',
        padding: '12px 30px'
      } }
    >
      <Typography variant='h2' component='h2' my={ 2}>
        <strong>ANGELOUS</strong>
      </Typography>
      <Typography mb={ 1}>
        &copy; { currentYear } - Todos los derechos Reservados - Creado por Angelous Zegarra
      </Typography>
    </Box>
  )
}

export default FooterShopLayout
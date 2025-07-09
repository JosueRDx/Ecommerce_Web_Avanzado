import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined
} from '@mui/icons-material'

import AdminLayout from '../../components/layouts/AdminLayout'
import SummaryTile from '../../components/admin/SummaryTile'
import { DashboardSummaryResponse } from '../../interfaces'

const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30seg
  })

  const [refreshIn, setRefreshIn] = useState<number>(30)

  useEffect(() => {

    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!error && !data) {
    return <></>
  }

  if (error) {
    console.error(error)
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          sx={{
            color: '#333',
            fontSize: '1.5rem',
            fontWeight: 'medium'
          }}
        >
          Error al cargar la información
        </Typography>
      </Box>
    )
  }

  const {
    numberOfOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    paidOrders,
    notPaidOrders
  } = data!

  const statsData = [
    {
      title: numberOfOrders,
      subtitle: 'Total de órdenes',
      icon: <CreditCardOutlined sx={{ fontSize: 40, color: '#1976d2' }} />,
      bgColor: '#e3f2fd'
    },
    {
      title: paidOrders,
      subtitle: 'Órdenes pagadas',
      icon: <AttachMoneyOutlined sx={{ fontSize: 40, color: '#2e7d32' }} />,
      bgColor: '#e8f5e8'
    },
    {
      title: notPaidOrders,
      subtitle: 'Órdenes pendientes',
      icon: <CreditCardOffOutlined sx={{ fontSize: 40, color: '#d32f2f' }} />,
      bgColor: '#ffebee'
    },
    {
      title: numberOfClients,
      subtitle: 'Clientes',
      icon: <GroupOutlined sx={{ fontSize: 40, color: '#7b1fa2' }} />,
      bgColor: '#f3e5f5'
    },
    {
      title: numberOfProducts,
      subtitle: 'Productos',
      icon: <CategoryOutlined sx={{ fontSize: 40, color: '#f57c00' }} />,
      bgColor: '#fff3e0'
    },
    {
      title: productsWithNoInventory,
      subtitle: 'Productos sin stock',
      icon: <CancelPresentationOutlined sx={{ fontSize: 40, color: '#d32f2f' }} />,
      bgColor: '#ffebee'
    },
    {
      title: lowInventory,
      subtitle: 'Productos con poco stock',
      icon: <ProductionQuantityLimitsOutlined sx={{ fontSize: 40, color: '#f57c00' }} />,
      bgColor: '#fff3e0'
    },
    {
      title: refreshIn,
      subtitle: 'Actualización en',
      icon: <AccessTimeOutlined sx={{ fontSize: 40, color: '#5e35b1' }} />,
      bgColor: '#ede7f6'
    }
  ]

  return (
    <AdminLayout
      title='Dashboard'
      subTitle='Estadísticas Generales'
      icon={<DashboardOutlined />}
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          padding: 3
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#2c3e50',
            textAlign: 'center'
          }}
        >
          Panel de Control
        </Typography>

        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: stat.bgColor,
                        borderRadius: '12px',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant='h3'
                      component='div'
                      sx={{
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        fontSize: '2rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#7f8c8d',
                      fontWeight: 'medium',
                      fontSize: '0.95rem'
                    }}
                  >
                    {stat.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default DashboardPage
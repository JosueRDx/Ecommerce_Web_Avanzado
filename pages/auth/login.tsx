import { useState, useEffect, useRef } from 'react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { signIn, getSession, getProviders } from 'next-auth/react'

import { Box, Button, Chip, Grid, Divider, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'
import { useRouter } from 'next/router'

type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    const router = useRouter()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [showError, setShowError] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders().then(prov => setProviders(prov))
    }, [])

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
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            const particleCount = 150
            particles.length = 0

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * 0.02 + 0.01
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(particle => {
                particle.y -= particle.speed
                particle.opacity += Math.sin(Date.now() * particle.twinkle) * 0.01

                if (particle.y < 0) {
                    particle.y = canvas.height
                    particle.x = Math.random() * canvas.width
                }

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, particle.opacity))})`
                ctx.shadowBlur = particle.size * 3
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

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)
        await signIn('credentials', { email, password })
    }

    return (
        <AuthLayout title={'ANGELOUS | Login'}>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#000000',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Canvas para las partículas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        pointerEvents: 'none'
                    }}
                />

                <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                    <Box 
                        sx={{ 
                            width: 350, 
                            padding: '40px 30px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '15px',
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: '0 15px 35px rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography 
                                    variant='h1' 
                                    component='h1' 
                                    sx={{
                                        my: 3,
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: { xs: '2.5rem', md: '3rem' },
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
                                    ANGELOUS
                                </Typography>
                                <Chip
                                    label='Usuario o contraseña incorrectos'
                                    color='error'
                                    icon={<ErrorOutline />}
                                    className='fadeIn'
                                    sx={{ 
                                        display: showError ? 'flex' : 'none',
                                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 0, 0, 0.5)',
                                        '& .MuiChip-icon': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='email'
                                    label='Correo electrónico'
                                    variant='outlined'
                                    fullWidth
                                    {
                                    ...register('email', {
                                        required: 'X - El campo de correo es requerido',
                                        validate: validations.isEmail
                                    }) }
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.3)'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.6)'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white'
                                            },
                                            '& input': {
                                                color: 'white',
                                                backgroundColor: 'transparent'
                                            },
                                            '& input:-webkit-autofill': {
                                                WebkitBoxShadow: '0 0 0 1000px transparent inset',
                                                WebkitTextFillColor: 'white',
                                                backgroundColor: 'transparent !important'
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Contraseña'
                                    type='password'
                                    variant='outlined'
                                    fullWidth
                                    {
                                    ...register('password', {
                                        required: 'X - El campo de contraseña es requerido',
                                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                    }) }
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.3)'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.6)'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white'
                                            },
                                            '& input': {
                                                color: 'white',
                                                backgroundColor: 'transparent'
                                            },
                                            '& input:-webkit-autofill': {
                                                WebkitBoxShadow: '0 0 0 1000px transparent inset',
                                                WebkitTextFillColor: 'white',
                                                backgroundColor: 'transparent !important'
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} my={3}>
                                <Button
                                    type='submit'
                                    color='secondary'
                                    className='circular-btn'
                                    size='large'
                                    fullWidth
                                    aria-label='login'
                                    sx={{
                                        textTransform: 'uppercase',
                                        py: '12px',
                                        letterSpacing: '1px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        transition: 'all 0.3s ease',
                                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                                            textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                                        }
                                    }}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='end'>
                                <NextLink
                                    href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                    passHref
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        textDecoration: 'none',
                                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    ¿No tienes una cuenta?
                                </NextLink>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                display='flex'
                                flexDirection='column'
                                justifyContent='end'
                            >
                                <Divider 
                                    sx={{ 
                                        width: '100%', 
                                        mb: 3,
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                    }} 
                                />
                                {
                                    Object.values(providers).map((provider: any) => {

                                        if (provider.id === 'credentials') {
                                            return (<div key="credentials"></div>)
                                        }

                                        return (
                                            <Button
                                                key={provider.id}
                                                variant='outlined'
                                                fullWidth
                                                color='secondary'
                                                sx={{
                                                    mb: 1,
                                                    textTransform: 'uppercase',
                                                    py: '12px',
                                                    letterSpacing: '1px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    color: 'white',
                                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                                                        textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                                                    }
                                                }}
                                                onClick={() => signIn(provider.id)}
                                            >
                                                {provider.name}
                                            </Button>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </form>

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
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })

    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage
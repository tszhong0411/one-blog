import { Button, Container, Flex, Paper, Text, Title } from '@mantine/core'
import { IconBrandGoogle } from '@tabler/icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'

import Layout from '@/components/Layout'

const LoginPage = () => {
  const { query } = useRouter()

  return (
    <Layout
      seo={{
        title: 'Login',
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Container
        size={560}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Title align='center' weight={900}>
          Welcome back!
        </Title>

        <Paper withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
          <Button
            fullWidth
            h={40}
            onClick={() =>
              signIn('google', {
                redirect: true,
                callbackUrl: String(query.callbackUrl),
              })
            }
          >
            <Flex gap={8} align='center' justify='center'>
              <IconBrandGoogle size={18} stroke={4} />
              <Text>Sign in with Google</Text>
            </Flex>
          </Button>
        </Paper>
      </Container>
    </Layout>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: '/' },
      props: {},
    }
  }

  return {
    props: {},
  }
}

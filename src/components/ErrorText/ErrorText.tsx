import { Container } from '@mantine/core'

import Layout from '../Layout'

type ErrorTextProps = {
  message?: string
}

const ErrorText = (props: ErrorTextProps) => {
  const { message = 'You need to be authenticated to view this page.' } = props

  return (
    <Layout>
      <Container size={1000} px='xl'>
        <div>{message}</div>
      </Container>
    </Layout>
  )
}

export default ErrorText

import {
  BoxProps,
  Container,
  ContainerProps,
  Skeleton,
  SkeletonProps,
} from '@mantine/core'

import Layout from '../Layout'

type LoaderProps = {
  containerProps?: ContainerProps
  layoutProps?: BoxProps
} & SkeletonProps

const Loader = (props: LoaderProps) => {
  const {
    height = '80vh',
    width = '100%',
    containerProps,
    layoutProps,
    ...rest
  } = props

  return (
    <Layout {...layoutProps}>
      <Container size={1000} px='xl' {...containerProps}>
        <Skeleton width={width} height={height} {...rest} />
      </Container>
    </Layout>
  )
}

export default Loader

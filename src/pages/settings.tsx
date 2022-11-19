import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useSession } from 'next-auth/react'
import React from 'react'

import { updateProfileHandler } from '@/lib/handler'
import { ProfileSchema } from '@/lib/schema'

import ErrorText from '@/components/ErrorText'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'

const SettingsPage = () => {
  const { data: session, status } = useSession()

  const form = useForm({
    initialValues: {
      image: '',
      name: '',
      bio: '',
    },

    validate: zodResolver(ProfileSchema),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.onSubmit((values) => {
      const { image, name, bio } = values

      updateProfileHandler({
        body: {
          image,
          name,
          bio,
        },
        callback: () => {
          // ? Update session
          const event = new Event('visibilitychange')
          document.dispatchEvent(event)
        },
      })
    })(e)
  }

  React.useEffect(() => {
    if (session) {
      form.setValues({
        image: session.user.image,
        name: session.user.name,
        bio: session.user.bio || '',
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (status === 'loading') {
    return <Loader height='60vh' />
  }

  if (status === 'unauthenticated') {
    return <ErrorText />
  }

  return (
    <Layout
      seo={{
        title: 'Settings',
      }}
    >
      <Container size={1000} px={{ base: 'xl', sm: 56 }} w='100%'>
        <form onSubmit={onSubmit}>
          <Flex direction='column' gap={24} mb={24}>
            <Flex direction='column' gap={16}>
              <Text size='lg'>Profile picture</Text>
              <Avatar
                w={120}
                h={120}
                src={session?.user.image}
                radius={9999}
                imageProps={{
                  referrerPolicy: 'no-referrer',
                }}
              />
              <TextInput label='Image url' {...form.getInputProps('image')} />
            </Flex>
            <Divider />
            <TextInput label='Display name' {...form.getInputProps('name')} />
            <TextInput label='Bio' {...form.getInputProps('bio')} />
          </Flex>
          <Button type='submit'>Update profile</Button>
        </form>
      </Container>
    </Layout>
  )
}

export default SettingsPage

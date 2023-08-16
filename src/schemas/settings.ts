import { object, string } from 'yup'

export const settingsSchema = object().shape({
  image: string().required('Name is required').url('Image must be a valid URL'),
  name: string().required('Name is required').max(40, 'Name is too long'),
  bio: string(),
})

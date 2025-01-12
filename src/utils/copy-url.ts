import { toast } from 'react-hot-toast'

export const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    toast.success('Link copied!')
  } catch (error) {
    toast.error(`Copy post link error: ${(error as Error).message}`)
  }
}

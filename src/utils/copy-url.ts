import { toast } from '@tszhong0411/ui'

export const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    toast.success('Link copied')
  } catch (error) {
    toast.error(`Copy post link error: ${(error as Error).message}`)
  }
}

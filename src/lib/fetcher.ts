/* eslint-disable @typescript-eslint/no-explicit-any */
const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init)

  if (res.status === 403) {
    throw new Error('Unauthorized')
  }

  if (res.status === 404) {
    throw new Error('Not found')
  }

  return res.json()
}

export default fetcher

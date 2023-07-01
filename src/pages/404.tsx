import Link from 'next/link'

export default function FourZeroFour() {
  return (
    <div className='flex h-content flex-col items-center justify-center'>
      <h1 className='mb-6 text-2xl font-bold text-white sm:text-4xl'>
        404 - Page Not Found
      </h1>
      <p className='mb-6 text-white sm:text-lg'>
        Sorry, the page you are looking for could not be found.
      </p>
      <Link
        href='/'
        className='rounded-md border border-white bg-white px-6 py-2 font-bold text-black transition-colors duration-300 hover:bg-black hover:text-white'
      >
        Go back to home
      </Link>
    </div>
  )
}

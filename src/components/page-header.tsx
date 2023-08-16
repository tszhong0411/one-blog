type PageHeaderProps = {
  title: string
  description?: string
} & React.ComponentPropsWithoutRef<'div'>

const PageHeader = (props: PageHeaderProps) => {
  const { title, description, ...rest } = props

  return (
    <div {...rest}>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {description && <p className='text-accent-5'>{description}</p>}
    </div>
  )
}

export default PageHeader

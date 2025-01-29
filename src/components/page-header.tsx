type PageHeaderProps = {
  title: string
  description?: string
} & React.ComponentProps<'div'>

const PageHeader = (props: PageHeaderProps) => {
  const { title, description, ...rest } = props

  return (
    <div {...rest}>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {description && <p className='text-muted-foreground'>{description}</p>}
    </div>
  )
}

export default PageHeader

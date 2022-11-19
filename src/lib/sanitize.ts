import sanitizeHtml from 'sanitize-html'

const sanitizeConfig: sanitizeHtml.IOptions = {
  allowedTags: [
    'b',
    'i',
    's',
    'em',
    'strong',
    'a',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'pre',
    'sup',
    'sub',
    'img',
    'blockquote',
    'iframe',
    'span',
    'code',
    'hr',
  ],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data'],
  allowedClasses: {
    span: ['*'],
  },
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src'],
    iframe: ['src'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'youtu.be'],
}

type SanitizeProps = {
  dirty: string
  options?: sanitizeHtml.IOptions
}

export const sanitize = (props: SanitizeProps): string => {
  const { dirty, options } = props

  return sanitizeHtml(dirty, { ...sanitizeConfig, ...options })
}

export type LinkVariant = 'underline' | 'green'

export type LinkProps = {
  text: string
  href: string
  variant?: LinkVariant
}

export function Link(props: LinkProps): HTMLAnchorElement {
  const anchor = document.createElement('a')
  anchor.href = props.href
  anchor.textContent = props.text

  const variant = props.variant ?? 'underline'
  if (variant === 'underline') {
    anchor.className =
      'text-cinza-claro font-prompt text-sm underline hover:text-offwhite transition-colors duration-200'
  } else {
    anchor.className =
      'text-verde-destaque font-prompt text-sm font-medium hover:text-verde-pastel transition-colors duration-200'
  }

  return anchor
}

export type AuthTemplateProps = {
  bannerSlot: HTMLElement
  formSlot: HTMLElement
}

export function AuthTemplate(props: AuthTemplateProps): HTMLElement {
  const main = document.createElement('main')
  main.className =
    'relative flex min-h-screen items-center justify-center bg-grafite font-prompt overflow-hidden p-6'

  // Background watermark — top-left
  const bgLogoTopLeft = document.createElement('img')
  bgLogoTopLeft.src = '/logo-cc-cinza.webp'
  bgLogoTopLeft.alt = ''
  bgLogoTopLeft.className = 'absolute -top-16 -left-16 w-80 opacity-20 pointer-events-none select-none'

  // Background watermark — bottom-right
  const bgLogoBottomRight = document.createElement('img')
  bgLogoBottomRight.src = '/logo-cc-cinza.webp'
  bgLogoBottomRight.alt = ''
  bgLogoBottomRight.className = 'absolute -bottom-16 -right-16 w-80 opacity-20 pointer-events-none select-none'

  // Centered card
  const card = document.createElement('div')
  card.className = 'relative z-10 flex w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl'

  // Left column — banner (hidden on mobile, visible on lg+)
  const leftColumn = document.createElement('div')
  leftColumn.className = 'hidden lg:block lg:w-72 shrink-0'
  leftColumn.appendChild(props.bannerSlot)

  // Right column — form
  const rightColumn = document.createElement('div')
  rightColumn.className =
    'w-full flex items-center justify-center p-8 bg-cinza-escuro'
  rightColumn.appendChild(props.formSlot)

  card.appendChild(leftColumn)
  card.appendChild(rightColumn)

  main.appendChild(bgLogoTopLeft)
  main.appendChild(bgLogoBottomRight)
  main.appendChild(card)

  return main
}

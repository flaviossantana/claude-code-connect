export type AuthTemplateProps = {
  bannerSlot: HTMLElement
  formSlot: HTMLElement
}

export function AuthTemplate(props: AuthTemplateProps): HTMLElement {
  const main = document.createElement('main')
  main.className = 'flex min-h-screen bg-grafite font-prompt'

  // Left column — banner (hidden on mobile, visible on lg+)
  const leftColumn = document.createElement('div')
  leftColumn.className = 'hidden lg:block lg:w-1/2'
  leftColumn.appendChild(props.bannerSlot)

  // Right column — form
  const rightColumn = document.createElement('div')
  rightColumn.className =
    'w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-cinza-escuro'
  rightColumn.appendChild(props.formSlot)

  main.appendChild(leftColumn)
  main.appendChild(rightColumn)

  return main
}

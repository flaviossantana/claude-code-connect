export type BannerColumnProps = {
  imageSrc?: string
}

export function BannerColumn(props?: BannerColumnProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'relative w-full h-full overflow-hidden'

  const img = document.createElement('img')
  img.src = props?.imageSrc ?? '/banner-login.webp'
  img.alt = 'Code Connect banner'
  img.className = 'w-full h-full object-cover object-center'

  wrapper.appendChild(img)

  return wrapper
}

export function BannerColumn(): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'relative w-full h-full overflow-hidden'

  const img = document.createElement('img')
  img.src = '/banner-login.png'
  img.alt = 'Code Connect banner'
  img.className = 'w-full h-full object-cover object-center'

  // Logo overlay at bottom-left
  const overlay = document.createElement('div')
  overlay.className = 'absolute bottom-8 left-8'

  const logoWrapper = document.createElement('div')
  logoWrapper.className = 'flex items-center gap-2'

  const logoImg = document.createElement('img')
  logoImg.src = '/favicon.svg'
  logoImg.alt = 'Code Connect logo'
  logoImg.className = 'w-8 h-8'

  const logoText = document.createElement('span')
  logoText.className = 'text-branco font-prompt font-medium text-xl leading-tight'
  logoText.innerHTML = 'code<br>connect'

  logoWrapper.appendChild(logoImg)
  logoWrapper.appendChild(logoText)
  overlay.appendChild(logoWrapper)

  wrapper.appendChild(img)
  wrapper.appendChild(overlay)

  return wrapper
}

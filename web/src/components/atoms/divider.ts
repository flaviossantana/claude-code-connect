export type DividerProps = {
  text: string
}

export function Divider(props: DividerProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center gap-4 my-6'

  const lineLeft = document.createElement('hr')
  lineLeft.className = 'flex-1 border-t border-cinza'

  const span = document.createElement('span')
  span.textContent = props.text
  span.className = 'text-cinza-medio font-prompt text-sm whitespace-nowrap'

  const lineRight = document.createElement('hr')
  lineRight.className = 'flex-1 border-t border-cinza'

  wrapper.appendChild(lineLeft)
  wrapper.appendChild(span)
  wrapper.appendChild(lineRight)

  return wrapper
}

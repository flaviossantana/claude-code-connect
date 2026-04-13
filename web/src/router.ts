export type RouteConfig = {
  routes: Record<string, () => HTMLElement>
  defaultPath: string
  container: HTMLElement
}

export function createRouter(config: RouteConfig): () => void {
  function getHash(): string {
    return window.location.hash.slice(1) || config.defaultPath
  }

  function render(): void {
    const path = getHash()
    const factory = config.routes[path] ?? config.routes[config.defaultPath]

    if (!config.routes[path]) {
      window.location.hash = config.defaultPath
      return
    }

    config.container.innerHTML = ''
    config.container.appendChild(factory())
  }

  window.addEventListener('hashchange', render)
  render()

  return () => window.removeEventListener('hashchange', render)
}

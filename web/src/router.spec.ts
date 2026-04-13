import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createRouter } from './router'

describe('createRouter', () => {
  let container: HTMLDivElement
  let destroy: () => void

  beforeEach(() => {
    container = document.createElement('div')
    window.location.hash = ''
  })

  afterEach(() => {
    destroy?.()
    vi.restoreAllMocks()
  })

  it('renders the default route on init when no hash is set', () => {
    const loginEl = document.createElement('div')
    loginEl.setAttribute('data-page', 'login')

    destroy = createRouter({
      container,
      defaultPath: '/login',
      routes: {
        '/login': () => loginEl,
      },
    })

    expect(container.querySelector('[data-page="login"]')).toBeTruthy()
  })

  it('renders the route matching the current hash', () => {
    window.location.hash = '#/register'

    const registerEl = document.createElement('div')
    registerEl.setAttribute('data-page', 'register')

    destroy = createRouter({
      container,
      defaultPath: '/login',
      routes: {
        '/login': () => document.createElement('div'),
        '/register': () => registerEl,
      },
    })

    expect(container.querySelector('[data-page="register"]')).toBeTruthy()
  })

  it('redirects to defaultPath when hash is unknown', () => {
    window.location.hash = '#/unknown'

    destroy = createRouter({
      container,
      defaultPath: '/login',
      routes: {
        '/login': () => document.createElement('div'),
      },
    })

    expect(window.location.hash).toBe('#/login')
  })

  it('re-renders the correct page on hashchange', () => {
    window.location.hash = '#/login'

    destroy = createRouter({
      container,
      defaultPath: '/login',
      routes: {
        '/login': () => {
          const el = document.createElement('div')
          el.setAttribute('data-page', 'login')
          return el
        },
        '/register': () => {
          const el = document.createElement('div')
          el.setAttribute('data-page', 'register')
          return el
        },
      },
    })

    expect(container.querySelector('[data-page="login"]')).toBeTruthy()

    window.location.hash = '#/register'
    window.dispatchEvent(new Event('hashchange'))

    expect(container.querySelector('[data-page="register"]')).toBeTruthy()
    expect(container.querySelector('[data-page="login"]')).toBeNull()
  })
})

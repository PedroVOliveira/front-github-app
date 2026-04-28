import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util'
import { server } from './test/msw/server'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// MSW Lifecycle
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock requestIdleCallback to prevent Next.js Link's async prefetch
// from triggering state updates outside act() in JSDOM.
// The real rIC schedules work after the browser is idle, but JSDOM
// simulates it with setTimeout, causing the act() warning in React 19.
global.requestIdleCallback = (cb: IdleRequestCallback) => {
  cb({ didTimeout: false, timeRemaining: () => 0 })
  return 0
}
global.cancelIdleCallback = () => {}

// Centralized Next.js Mocks
jest.mock('next/headers', () => ({
  cookies: jest.fn().mockImplementation(async () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
  })),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '',
}))

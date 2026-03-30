import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any


jest.mock('next/headers', () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

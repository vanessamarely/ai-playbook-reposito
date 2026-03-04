declare module 'jest-axe' {
  import type { AxeResults } from 'axe-core'

  export interface JestAxeConfigureOptions {
    rules?: Record<string, { enabled: boolean }>
  }

  export interface AxeMatchers<R = void> {
    toHaveNoViolations(): R
  }

  export function axe(
    html: Element | string,
    options?: JestAxeConfigureOptions
  ): Promise<AxeResults>

  export function toHaveNoViolations(results: AxeResults): {
    pass: boolean
    message: () => string
  }

  export function configureAxe(options: JestAxeConfigureOptions): typeof axe
}

declare global {
  namespace Vi {
    interface Matchers<R = void> extends AxeMatchers<R> {}
    interface AsymmetricMatchers extends AxeMatchers {}
  }

  namespace jest {
    interface Matchers<R> extends AxeMatchers<R> {}
  }
}

export {}

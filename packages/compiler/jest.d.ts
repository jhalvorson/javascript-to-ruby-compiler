declare global {
  namespace jest {
    interface Matchers<R> {
      whitespaceMatcher(expected: string): R
    }
  }
}

export {};
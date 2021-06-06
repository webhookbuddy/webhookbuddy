export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toAllow(): Promise<R>;
      toDeny(): Promise<R>;
    }
  }
}

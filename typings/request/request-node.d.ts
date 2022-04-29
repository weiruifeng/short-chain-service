declare module '@myfe/request-node' {
  interface Init {
    (config: Config): void
  }
  interface Request {
    (...args: any[]): Promise<any>
  }

  export const init: Init;
  export const request: Request;
}
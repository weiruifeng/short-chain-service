declare module 'interface' {

  interface ICache {
    get: (key: string) => unknown;
    set: (key: string, value: unknown) => void;
    del: (key: string) => unknown;
  }
  interface IParamUrl {
    url: string,
  }
  interface ITinyUrl {

  }
  interface IParamTinyUrl {
    originalUrl: string,
    creator: string,
    expire?: number,
  }
  interface IDateMap {
    createDate: number,
    expireDate: number,
  }

  interface IInfo extends IDateMap {
    tinyUrl: string,
    originalUrl: string,
    creator: string,
  }
};
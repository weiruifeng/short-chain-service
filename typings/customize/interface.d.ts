declare module 'interface' {

  interface IUrlMapCache {
    id: number,
    tinyUrl: string,
    originalUrl: string,
  }

  interface IRefreshCache {
    pid: number,
    type: 'GET' | 'SET' | 'DEL',
    key: string,
    value?: IUrlMapCache,
  }

  interface IRefreshBloom {
    pid: number,
    value: JSON,
  }

  interface ICacheClient {
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
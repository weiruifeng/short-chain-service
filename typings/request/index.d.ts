export interface Config {
  appkey: string;
  http?: HttpConfig;
  thrift?: ThriftConfig;
  cat?: {
    appName: string;
  }
}

interface HttpConfig {
  [index: string]: string;
}

interface ThriftConfig {
  [index: string]: ThriftConfigItem;
}

interface MTOptionConfig {
  serviceList?: unknown[],
  unified?: boolean,
  retry?: number | unknown,
  timeout?: number,
}

interface ThriftConfigItem {
  Service: string;
  Types: string;
  remoteAppKey: string;
  serviceName: string;
  serviceType?: string | number,
  meshType?: string | number,
  subscribeTimeout?: number,
  mtOptions?: MTOptionConfig,
  timeout?: number,
}
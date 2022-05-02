// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportUrlMap from '../../../app/cache/url-map';

declare module 'egg' {
  interface Context {
    cache: T_custom_cache;
  }

  interface T_custom_cache {
    urlMap: AutoInstanceType<typeof ExportUrlMap>;
  }
}

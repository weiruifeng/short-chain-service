// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTinyUrl from '../../../app/dao/tiny-url';

declare module 'egg' {
  interface Context {
    dao: T_custom_dao;
  }

  interface T_custom_dao {
    tinyUrl: AutoInstanceType<typeof ExportTinyUrl>;
  }
}

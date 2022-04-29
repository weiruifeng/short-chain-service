// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTinyUrl from '../../../app/model/tiny-url';

declare module 'egg' {
  interface IModel {
    TinyUrl: ReturnType<typeof ExportTinyUrl>;
  }
}

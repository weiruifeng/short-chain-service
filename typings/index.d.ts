import 'egg';
import { StoreClient } from '@dp/squirrel-client';
import { User } from 'interface';
import { ILabelOption } from 'interface';
import { EggLogger } from 'egg';
declare module 'egg' {
  interface Context {
    setContacts(this: Context): Promise<void>,
    visitor: User,
    saleSystems?: ILabelOption[],
  }

  interface Application {
    redisStoreClient: StoreClient,
  }
}
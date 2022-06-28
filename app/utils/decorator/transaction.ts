import { BaseContextClass } from 'egg';

function trace(target: BaseContextClass, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;
  descriptor.value = function newValue() {
    const beginDate = Date.now();
    const name = `${target.constructor.name}_${propertyKey}`;
    // eslint-disable-next-line prefer-rest-params
    const promise = oldValue.apply(this, arguments);
    if (promise instanceof Promise) {
      promise.then((data: unknown) => {
        statisticsTime(name, beginDate);
        return data;
      }).catch((error: ErrorConstructor) => {
        statisticsTime(name, beginDate);
        throw error;
      });
    } else {
      statisticsTime(name, beginDate);
    }
    return promise;
  };
  return descriptor;
}

function statisticsTime(name: string, beginDate: number) {
  const timestamp = Date.now() - beginDate;
  console.log(`${name} time cost ${timestamp}`);
}

export {
  trace,
};


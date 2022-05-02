import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/:url', controller.urlMap.getOriginalUrl);
  router.post('/api/tinyUrl', controller.urlMap.setInfo);
};

import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/:url', controller.tinyUrl.getOriginalUrl);
  router.post('/api/tinyUrl', controller.tinyUrl.setInfo);
};

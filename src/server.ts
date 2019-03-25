import http from 'http';
import app from './app';
import config from './config';

http.createServer(app)
  .listen(config.PORT, () => {
    console.info(`server running with following config:`);
    console.dir(config);
  });

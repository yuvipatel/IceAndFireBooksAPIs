import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Config from './config';
import { defineRoutes } from './routes/routes';

const app: express.Application = express();
app.use(cors({}));
app.options('*', cors({})); // include before other routes
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const setupDb = (): mongoose.MongooseThenable => {
  // Use native promises for mongoose. Refer http://mongoosejs.com/docs/promises.html for details
  (mongoose as any).Promise = Promise;

  return mongoose.connect(Config.DB_URL, {
    useMongoClient: true
  });

};

setupDb()
  .then(() => {
    defineRoutes(app);
  }, (err) => {
    console.info('DB Setup Error ', err);
  });

export default app;

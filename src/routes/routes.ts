import express from 'express';
import ErrorHandler from './../common/errorHandler';
import { booksRouter, defineBooksRoute } from './booksRouter';

const defineRoutes = (app: express.Application): void => {

  app.use(booksRouter);

  defineBooksRoute();

  app.use(ErrorHandler.joiErrorHandler);
  app.use(ErrorHandler.errorHandler);
};

export { defineRoutes };

import { celebrate as validate } from 'celebrate';
import express from 'express';
import booksHandler from './../handlers/booksHandler';
import BooksValidator from './../validation/booksValidator';

const booksRouter = express.Router();
const defineBooksRoute = () => {

    booksRouter.get(
        '/api/external-books',
        validate({
          query: BooksValidator.externalBooksQuerySchema
        }),
        booksHandler.getExternalBook
      );

    booksRouter.post(
        '/api/v1/books',
        validate({
          body: BooksValidator.createBooksSchema
        }),
        booksHandler.createBook
      );

    booksRouter.get(
        '/api/v1/books',
        validate({
          query: BooksValidator.getBooksQuerySchema
        }),
        booksHandler.getBooks
      );

    booksRouter.get(
        '/api/v1/books/:bookId',
        booksHandler.getBook
      );

    booksRouter.patch(
        '/api/v1/books/:bookId',
        validate({
          body: BooksValidator.updateBookSchema
        }),
        booksHandler.updateBook
      );

    booksRouter.post(
        '/api/v1/books/:bookId/update',
        validate({
          body: BooksValidator.updateBookSchema
        }),
        booksHandler.updateBook
      );

    booksRouter.delete(
        '/api/v1/books/:bookId',
        booksHandler.deleteBook
      );

    booksRouter.post(
        '/api/v1/books/:bookId/delete',
        booksHandler.deleteBook
      );
};

export {
    booksRouter,
    defineBooksRoute
};

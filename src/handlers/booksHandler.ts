import axios from 'axios';
import express from 'express';
import _ from 'lodash';
import moment from 'moment';

import { Books } from './../models/books';

const ICE_AND_FIRE_BOOKS_API_URL = `https://www.anapioficeandfire.com/api/books`;

const transformBookData = (data) => {
    const result = [];
    if (!_.isEmpty(data)) {
        data.forEach(element => {
            const {
                name,
                isbn,
                authors,
                numberOfPages: number_of_pages,
                publisher,
                country,
                released: release_date 
            } = element;

            const transformBookData = {name, isbn, authors, number_of_pages, publisher, country, release_date};
            transformBookData.release_date = moment(release_date).format('YYYY-MM-DD');

            result.push(transformBookData);
        });
    }
    return result;
};

const getExternalBook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const bookName = req.query.name;
    try {
        const url = bookName ? `${ICE_AND_FIRE_BOOKS_API_URL}?name=${bookName}` : ICE_AND_FIRE_BOOKS_API_URL;
        const book = await axios.get(url);

        res.status(200).json({
            status_code: 200,
            status: 'success',
            data: transformBookData(book.data)
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            status: 'failure',
            message: 'Something went wrong!'
        });
    }
};

const createBook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
        name,
        isbn,
        authors,
        number_of_pages,
        publisher,
        country,
        release_date
    } = req.body;

    const bookObject = {
        name,
        isbn,
        authors,
        number_of_pages,
        publisher,
        country,
        release_date
    };

    bookObject.release_date = new Date(bookObject.release_date);

    try {
        const bookModel = new Books(bookObject);
        const bookDocument = await bookModel.save();

        res.status(201).json({
            status_code: 201,
            status: 'success',
            data: bookDocument
        });
    } catch (error) {
        next(error);
    }
};

const getBooks = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            name,
            country,
            publisher,
            releaseYear
        } = req.query;

        let booksQueryObject: any = {
            name,
            country,
            publisher,
            release_date: releaseYear ?
                {
                    $gte: new Date(releaseYear, 0, 1),
                    $lt: new Date(releaseYear, 11, 31)
                }
                :
                undefined
        };

        booksQueryObject = _.pickBy(booksQueryObject, (element) => element !== undefined);

        const books = await Books.find(booksQueryObject);
        res.status(200).json({
            status_code: 200,
            message: 'success',
            data: books
        });
    } catch (error) {
        next(error);
    }
};

const getBook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            bookId
        }  = req.params;
        const book = await Books.findById(bookId);

        res.status(200).json({
            status_code: 200,
            message: 'success',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            name,
            isbn,
            number_of_pages,
            publisher,
            country,
            release_date,
            authors
        }  = req.body;

        const {
            bookId
        } = req.params;

        let bookObject: any = {
            name,
            isbn,
            number_of_pages,
            publisher,
            country,
            release_date,
            authors
        };

        bookObject = _.pickBy(bookObject, (element) => element !== undefined);

        const book = await Books.findByIdAndUpdate({_id: bookId}, bookObject, { new : true });

        res.status(200).json({
            status_code: 200,
            message: 'success',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            bookId
        }  = req.params;
        const book = await Books.findByIdAndRemove({ _id: bookId });

        if (book) {
            res.status(200).json({
                status_code: 204,
                status: 'success',
                message: `The book ${book.name} was deleted successfully`,
                data: []
            });
        } else {
            res.status(200).json({
                status_code: 400,
                status: 'failure',
                message: `The book id is not valid`
            });
        }
    } catch (error) {
        next(error);
    }
};

export default {
    getExternalBook,
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
};

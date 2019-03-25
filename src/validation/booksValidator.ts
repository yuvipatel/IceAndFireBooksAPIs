import { Joi } from 'celebrate';

const createBooksSchema = {
    name :  Joi.string().trim().required(),
    isbn : Joi.string().trim().required(),
    authors: Joi.array().items(Joi.string().trim()).min(1).required(),
    number_of_pages: Joi.number().positive().required(),
    publisher: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    release_date: Joi.date().required()
};

const externalBooksQuerySchema = {
    name: Joi.string().trim().optional()
};

const getBooksQuerySchema = {
    name: Joi.string().trim().optional(),
    publisher: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    releaseYear: Joi.number().optional()
};

const updateBookSchema = Joi.object({
    name : Joi.string().trim().optional(),
    isbn : Joi.string().trim().optional(),
    authors: Joi.array().items(Joi.string().trim()).min(1).optional(),
    number_of_pages: Joi.number().positive().optional(),
    publisher: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    release_date: Joi.date().optional()
}).min(1);

const BooksValidator = {
    createBooksSchema,
    externalBooksQuerySchema,
    getBooksQuerySchema,
    updateBookSchema
};

export default BooksValidator;

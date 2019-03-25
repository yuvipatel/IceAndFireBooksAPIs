import moment from 'moment';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const BooksSchema = new Schema({
  name: { type: String, required: true, unique: true },
  isbn: {type: String, required: true,  unique: true },
  authors: { type: [String], required: true },
  number_of_pages: { type: Number, required: true },
  publisher: { type: String, required: true },
  country: { type: String, required: true },
  release_date: { type: Date, required: true}
}, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.release_date = moment(ret.release_date).format('YYYY-MM-DD');

        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
      }
    }
  });

export interface IBook extends mongoose.Document {
  name: string;
  isbn: string;
  authors: string[];
  number_of_pages: number;
  publisher: string;
  country: string;
  release_date: Date;
}

export const Books = mongoose.model<IBook>('Books', BooksSchema);

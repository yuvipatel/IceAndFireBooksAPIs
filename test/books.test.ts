import { assert } from 'chai';
import request from 'supertest';
import app from './../src/app';

const booksTestObject: any = {
  name: 'Test A Clash of Kings',
  isbn: '178-0553108033',
  authors: [
      'George R. R. Martin'
  ],
  number_of_pages: 768,
  publisher: 'Bantam Books',
  country: 'United States',
  release_date: '1999-02-02'
};

describe('CRUD /api/v1/books', () => {

  it('POST /api/v1/books responds with json', (done) => {
    request(app)
      .post('/api/v1/books')
      .send(booksTestObject)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) { return done(err); }
        done();
      });
  });

  it('GET /api/v1/books responds with json', () => {
    return request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.isTrue(response.body.data.length >= 1);
      });
  });

  it('GET /api/v1/books?name responds with json', () => {
    return request(app)
      .get(`/api/v1/books?name=${booksTestObject.name}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.isTrue(response.body.data[0].name === booksTestObject.name);
        booksTestObject.id = response.body.data[0].id;
      });
  });

  it('PATCH /api/v1/books:bookId responds with json', (done) => {
    request(app)
      .patch(`/api/v1/books/${booksTestObject.id}`)
      .send({ name : `${booksTestObject.name}-updated`})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        done();
      });
  });

  it('GET /api/v1/books:bookId responds with json', () => {
    return request(app)
      .get(`/api/v1/books/${booksTestObject.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.isTrue(response.body.data.name === `${booksTestObject.name}-updated`);
      });
  });

  it('DELETE /api/v1/books:bookId responds with json', () => {
    return request(app)
      .delete(`/api/v1/books/${booksTestObject.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.isTrue(response.body.data.length === 0);
      });
  });
});

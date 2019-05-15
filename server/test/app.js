import request from 'supertest';
import chai from 'chai';
import assert from 'assert';
import http from 'http';
import app from '../app';

require('custom-env')
  .env(true)
  .dotenvConfig({ encoding: 'utf8' });

const { expect } = chai;

console.log(process.env.PORT);

describe('app.js', () => {
  it('should get home', done => {
    request(app)
      .get('/api/v1')
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      })
      .catch(err => done(err));
  });
  it('should return http err code 404', done => {
    request(app)
      .get('/api/v1/home')
      .then(res => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(err => done(err));
  });
});

/*describe('HTTP Server', () => {
  it('should return 200', (done) => {
    http.get('http://localhost:5000/api/v1', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
}); */

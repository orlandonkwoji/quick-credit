import chai from 'chai';
import request from 'supertest';
import faker from 'faker';
import app from '../app';

const { expect } = chai;

const userId = 1000000002;
let tokenFrmPwd =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDAwMiwiZW1haWwiOiJ0aG9yQG9kaW5zb24ucmFnbmFyb2siLCJwYXNzd29yZCI6IiQyYiQxMCRRbC80OWlnSnouelNWdU1UMHkxUFZ1WVl6MlFwb1VDcEE5N29pOHg1Y2hFRUpPVHBHZG1LQyIsImlhdCI6MTU1ODA1NDExMywiZXhwIjoxNTU4MjI2OTEzfQ.5NXGFKUHMCME2sRt9DBEJOsqx_U-9chzx3G3VyGn-KE';
let tokenFrmAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDAwMSwiZW1haWwiOiJvcmxhbmRvbmt3b2ppQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU1ODA1NDIxOSwiZXhwIjoxNTU4MjI3MDE5fQ.496w5XoxP34eGjw2gxE2oJc31Ik0KDKjE17iqNn5AJs';
describe('User Route', () => {
  it('should signup a user with valid details', done => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: faker.internet.email(),
        firstName: faker.fake('{{name.firstName}}'),
        lastName: faker.fake('{{name.lastName}}'),
        password: 'oadndjadla',
        confirmPassword: 'oadndjadla',
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(201);
        expect(body).to.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.have.property('data');
        expect(body).to.have.property('token');
        expect(res.status).to.be.a('number');
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it('should not signup a user with invalid details', done => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testingapp',
        firstName: faker.fake('{{name.firstName}}'),
        lastName: faker.fake('{{name.lastName}}'),
        password: 'oadndjadla',
        confirmPassword: 'oadndjadla',
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
  it('should not signup a user if the passwords do not match', done => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testing@app.com',
        firstName: faker.fake('{{name.firstName}}'),
        lastName: faker.fake('{{name.lastName}}'),
        password: 'oadndjadewetla',
        confirmPassword: 'oadndsaffsajadla',
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
  it('should not signup a user with email already on the app database', done => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'orlandonkwoji@gmail.com',
        firstName: faker.fake('{{name.firstName}}'),
        lastName: faker.fake('{{name.lastName}}'),
        password: 'dodoajd',
        confirmPassword: 'dodoajd',
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(409);
        expect(body).to.be.an('object');
        expect(body.status).to.be.equal(409);
        expect(body).to.have.property('status');
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals(
          'A user has already registered with this email! Please register with another email',
        );
        done();
      });
  });

  it('should login an admin user and give him an admin token', done => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'orlandonkwoji@gmail.com', password: 'deathrow' })
      .end((error, res) => {
        const { body } = res;
        tokenFrmAdmin = body.token;
        expect(res.status).to.be.equal(200);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.have.property('token');
        expect(body.data).to.be.an('object');
        expect(body.token).to.be.a('string');
        done();
      });
  });
  it('should login a user succesfully and give him a user token', done => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'thor@odinson.ragnarok', password: 'deathinfire' })
      .end((err, res) => {
        const { body } = res;
        tokenFrmPwd = body.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.have.property('token');
        expect(body.token).to.be.a('string');
        done();
      });
  });
  it('should not login an unregistered user', done => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'madHatter@ged.com', password: 'sammyZend' })
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Your email is not registered');
        done();
      });
  });
  it('Should return error for empty inputs', done => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(422);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
  it('Should return an error for incorrect password', done => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'thor@odinson.ragnarok',
        password: 'iduajikjio33',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(401);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Your password or email is incorrect');
        done();
      });
  });

  it('should get all users successfully', done => {
    request(app)
      .get('/api/v1/auth/user')
      .send({ email: 'orlandonkwoji@gmail.com', password: 'deathrow' })
      .set('token', tokenFrmAdmin)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('rowCount');
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
  it('should not get all users if its a client', done => {
    request(app)
      .get('/api/v1/auth/user')
      .set('token', tokenFrmPwd)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Unauthorized access');
        done();
      });
  });

  it('should get a user successfully', done => {
    request(app)
      .get(`/api/v1/auth/user/${userId}`)
      .set('token', tokenFrmAdmin)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

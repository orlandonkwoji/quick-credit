import moment from 'moment';
import fs from 'fs';
import path from 'path';
import userDb from '../models/userDb';
import validator from '../helpers/validator';
import Helper from '../helpers/helper';
import authenticate from '../middlewares/authenticate';

require('custom-env')
  .env(true)
  .dotenvConfig({ encoding: 'utf8' });

module.exports = {
  /**
   * @param {object} req
   * @param {object} res
   */
  newUser(req, res) {
    const { error } = validator.validateUserInput(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const hashedPassword = Helper.passwordHasher(req.body.password);
    const newUser = {
      id: 1000000000 + userDb.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      },
      status: 'unverified',
      isAdmin: false,
      signupDate: moment(new Date()),
      upDate: moment(new Date()),
    };

    delete req.body.street;
    delete req.body.city;
    delete req.body.state;
    delete req.body.country;

    const userExist = userDb.find(usr => usr.email === req.body.email);
    if (userExist) {
      return res.status(409).json({
        status: 409,
        error: 'A user has already registered with this email! Please register with another email',
      });
    }
    userDb.push(newUser);
    const output = `const user =\n${JSON.stringify(userDb, null, 2)}\n\nmodule.exports = user;`;
    fs.writeFileSync(path.resolve('./server/models/userDb.js'), output);

    const token = authenticate.generateToken(newUser.id, newUser.email, newUser.isAdmin);
    return res.status(201).json({
      status: 201,
      token,
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  },
};

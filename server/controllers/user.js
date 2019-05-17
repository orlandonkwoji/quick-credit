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

    const token = authenticate.createTokenWadmin(newUser.id, newUser.email, newUser.isAdmin);
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

  login(req, res) {
    const { error } = validator.verifyLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    const user = userDb.find(usr => usr.email === req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'Your email is not registered',
      });
    }
    if (!Helper.comparePasswords(user.password, req.body.password)) {
      return res.status(401).json({
        status: 401,
        error: 'Your password or email is incorrect',
      });
    }

    let token;

    if (user.isAdmin) {
      token = authenticate.createTokenWadmin(user.id, user.email, user.isAdmin);
    } else {
      token = authenticate.createTokenWpwd(user.id, user.email, user.password);
    }

    return res.status(200).json({
      status: 200,
      token,
      data: user,
    });
  },

  allUsers(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized access',
      });
    }

    return res.status(200).json({
      status: 200,
      data: userDb,
      rowCount: userDb.length,
    });
  },

  oneUser(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized access',
      });
    }
    const requestId = parseInt(req.params.id, 10);

    const theUser = userDb.find(user => user.id === requestId);

    if (!theUser) {
      return res.status(404).json({
        status: 404,
        error: 'user is not on our database',
      });
    }
    return res.status(200).json({
      status: 200,
      data: theUser,
    });
  },
};

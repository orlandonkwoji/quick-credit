import jwt from 'jsonwebtoken';
import db from '../models/userDb';

module.exports = {
  /**
   * Generate token based on payload.
   *
   * @param {*} id
   * @param {*} email
   * @param {*} isAdmin
   */
  generateToken(id, email, isAdmin) {
    const token = jwt.sign(
      {
        id,
        email,
        isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
    );

    return token;
  },

  /**
   * Generate token based on payload.
   *
   * @param {*} id
   * @param {*} email
   * @param {*} isAdmin
   */
  generatepwToken(id, email, password) {
    const token = jwt.sign(
      {
        id,
        email,
        password,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '10 minutes',
      },
    );

    return token;
  },

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if token is provided
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized! Sign in',
      });
    }

    try {
      // verify user provided token against existing token
      const decoded = await jwt.verify(token, process.env.JWT_KEY);

      const user = db.User.find(existUser => existUser.id === decoded.id);

      // check for valid app users
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized! Sign in',
        });
      }

      // get user id
      req.user = decoded;

      return next();
    } catch (errors) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
  },
};

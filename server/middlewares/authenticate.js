import jwt from 'jsonwebtoken';
import userDb from '../models/userDb';

module.exports = {
  createTokenWadmin(id, email, isAdmin) {
    const token = jwt.sign(
      {
        id,
        email,
        isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '2d',
      },
    );

    return token;
  },

  createTokenWpwd(id, email, password) {
    const token = jwt.sign(
      {
        id,
        email,
        password,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '2d',
      },
    );

    return token;
  },

  tokenValidator(req, res, next) {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized ! Please, login',
      });
    }

    try {
      /**
       * Validate the user's token
       */
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const userExist = userDb.find(usr => usr.id === decoded.id);

      if (!userExist) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid token',
        });
      }

      req.user = decoded;

      return next();
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: err,
      });
    }
  },
};

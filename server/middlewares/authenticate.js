import jwt from 'jsonwebtoken';

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
        expiresIn: '4h',
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
        expiresIn: '1h',
      },
    );

    return token;
  },
};

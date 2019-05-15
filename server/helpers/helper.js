import bcrypt from 'bcrypt';

module.exports = {
  passwordHasher(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
  },

  comparePasswords(hashedPwd, pwd) {
    return bcrypt.compareSync(pwd, hashedPwd);
  },
};

import bcrypt from 'bcrypt';

module.exports = {
  /**
   * password hasher
   * @param {string} pwd
   * @returns {string} returns the hash of the input password
   */
  passwordHasher(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
  },
};

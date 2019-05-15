import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

/**
 * User can signup
 */
router.post('/signup', userController.newUser);

/**
 * user can sign up
 */
router.post('/signin', userController.login);

module.exports = router;

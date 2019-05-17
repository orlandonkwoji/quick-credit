import express from 'express';
import userController from '../controllers/user';

import authenticate from '../middlewares/authenticate';

const router = express.Router();

/**
 * User can signup
 */
router.post('/signup', userController.newUser);

/**
 * user can sign up
 */
router.post('/signin', userController.login);

router.get('/user', authenticate.tokenValidator, userController.allUsers);

router.get('/user/:id', authenticate.tokenValidator, userController.oneUser);

module.exports = router;

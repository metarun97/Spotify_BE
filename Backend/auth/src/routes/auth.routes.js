import express from "express";
import * as authController from '../controllers/auth.controller.js';
import * as validation from '../middlewares/validation.middleware.js';
import passport from "passport";

/* Router created */
const router = express.Router();


/**
 @route /api/auth/register
 @description register a new user
 @access publice
 */
router.post("/register", validation.registerValidation, authController.register);


/**
 @route /api/auth/login
 @description login a new user
 @access publice
 */
router.post("/login", validation.loginValidation, authController.login);


/**
 @route /api/auth/google
 @description Route to initiate Google OAuth flow
 @access public
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


/**
 @route /api/auth/google/callback
 @description Callback route that Google will redirect to after authentication
 @access public
 */
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleAuthCallback
);

export default router;

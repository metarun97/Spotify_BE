import express from "express";
import * as authController from '../controllers/auth.controller.js';
import * as validation from '../middlewares/validation.middleware.js';


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


export default router;

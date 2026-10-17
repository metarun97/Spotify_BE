import config from '../config/config.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { publishToQueue } from '../broker/rabbit.js';


/**
 @name register
 @description expect email,password,fullname and role in req.body
 @access public
 */
export const register = async (req, res) => {

  try {
    const { email, password, fullname: { firstName, lastName }, role = "user" } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
      res.status(400).json({
        message: "User already Exists!",
      })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hash,
      fullname: { firstName, lastName },
      role,
    })

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn: "2d" })

    /* Pass message in queue */
    await publishToQueue("user_created", {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      }
    })


  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error in Register!",
    })
  }
}


/**
 @name login
 @description expect email, password in req.body
 @access public
 */
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password!",
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Email or Password!",
      })
    }

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn: "2d" })


    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })

    res.status(200).json({
      message: "User loggedIn successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      }
    })

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error in Login!",
    })
  }
}


/**
 @name login/register
 @description expect email only for that
 @access public
 */
export const googleAuthCallback = async (req, res) => {

  try {
    const user = req.user;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [
        { email: user.emails[0].value },
        { googleId: user.id }
      ]
    })

    if (isUserAlreadyExist) {

      const token = jwt.sign({
        id: isUserAlreadyExist._id,
        role: isUserAlreadyExist.role
      }, config.JWT_SECRET, { expiresIn: "2d" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
      })

      res.status(201).json({
        message: "User loggedIn successfully!",
        user: {
          id: isUserAlreadyExist._id,
          email: isUserAlreadyExist.email,
          fullname: isUserAlreadyExist.fullname,
          role: isUserAlreadyExist.role,
        }
      })

    }

    const newUser = await userModel.create({
      googleId: user.id,
      email: user.emails[0].value,
      fullname: {
        firstName: user.name.givenName,
        lastName: user.name.familyName,
      }
    })

    const token = jwt.sign({
      id: newUser._id,
      role: newUser.role
    }, config.JWT_SECRET, { expiresIn: "2d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role,
      }
    })

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error in Authregister",
    })
  }
}

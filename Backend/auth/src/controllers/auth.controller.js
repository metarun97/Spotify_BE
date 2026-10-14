import config from '../config/config.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";


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

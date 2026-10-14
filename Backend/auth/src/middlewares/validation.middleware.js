import { validationResult, body } from "express-validator";

/* Validate error array */
const validate = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  next();
}

/* Register user validation */
export const registerValidation = [
  body("email")
    .isString()
    .withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),

  body("fullname.firstName")
    .isString("firstName is required"),

  body("fullname.lastName")
    .isString("lastName is required"),

  validate,

]

/* Register user validation */
export const loginValidation = [
  body("email")
    .isString()
    .withMessage("Invalid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,

]

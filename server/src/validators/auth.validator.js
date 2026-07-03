const { body } = require("express-validator");

exports.registerValidator = [

    body("username")
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];

exports.loginValidator = [

    body("email")
        .isEmail(),

    body("password")
        .notEmpty()

];
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array()
            });

        }

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {

            return res.status(409).json({
                message: "User already exists"
            });

        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = user.generateToken();

        res.status(201).json({

            message: "User Registered Successfully",

            token,

            user: {

                id: user._id,
                username: user.username,
                email: user.email,
                rating: user.rating

            }

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                message: "Invalid Credentials"
            });

        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Credentials"
            });

        }

        const token = user.generateToken();

        res.json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                username: user.username,
                email: user.email,
                rating: user.rating

            }

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
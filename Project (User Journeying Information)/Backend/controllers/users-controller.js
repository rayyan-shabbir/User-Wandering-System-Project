const { validationResult } = require('express-validator');

const User = require('../models/user');
const HttpError = require('../models/http-error');

// const DUMMY_USERS = [
//     {
//         id: "u1",
//         name: "Muhammad Rayyan Shabir",
//         email: "rayan@gmail.com",
//         password: "testers"
//     }
// ];


const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failded, please try again later.', 500);

        return next(error);
    }

    res.json({users: users.map(user => user.toObject({getters: true}))});
}

 
const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const { name, email, password } = req.body;

        const error = new HttpError("Invalid inputs passed, please check your data, " + name , 422);


        // console.log(name, email, password);

        return next(error);

    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});
    } catch(err) {
        const error = new HttpError(
            'Siging up failed, please try again later', 500
        );

        return next(error);
    }

    if(existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.', 422
        );

        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&psig=AOvVaw2E4ybvDrTRq_TVOtZq6hPQ&ust=1696526755485000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjfl-r03IEDFQAAAAAdAAAAABAD',
        password,
        places: []
    });

    try {
        await createdUser.save();

    } catch(err) {
        const error = new HttpError('Signing up failed, please try again', 500);

        return next(error);
    }
    // DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser.toObject({getters : true}) });
}


const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});
    } catch(err) {
        const error = new HttpError(
            'Loging in failed, please try again later', 500
        );

        return next(error);
    }


    if (!existingUser || existingUser.password !== password) {
        return next( new HttpError('Invalid credential, could not log you in.', 401));
    }

    res.json({ message: "Logged in!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
import User from "../models/User.model.js";
import generateToken from "../db/generateToken.js";

const SignUp = async (req, res) => {
    const { email, name, password, img, bio ,isSeller } = req.body;

    if (!name || !email || !password || !bio) {
        return res.status(404).send("Please provide all fields");
    }

    try {
        const foundUser = await User.findOne({ email: email });

        if (foundUser) {
            return res.status(400).send("Email already exists");
        }

        const newUser = await User.create({
            isSeller,
            name,
            email,
            password,
            img,
            bio
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id),
                img: newUser.img,
                bio: newUser.bio,
                isSeller:newUser.isSeller
            });
        } else {
            return res.status(400).send("Invalid user data");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};

const SignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please provide all fields");
    }

    try {
        const foundUser = await User.findOne({ email: email });

        if (foundUser && (await foundUser.matchPassword(password))) {
            res.status(200).json({
                _id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                token: generateToken(foundUser._id),
                img: foundUser.img,
                bio: foundUser.bio,
                isSeller : foundUser.isSeller
            });
        } else {
            return res.status(400).send("Invalid email or password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};

export { SignUp, SignIn };
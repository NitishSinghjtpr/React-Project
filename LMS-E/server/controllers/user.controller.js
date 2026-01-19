import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError("Email already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      // avatar: {
      //   public_id: email,
      //   secure_url:
      //     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      // },
    });

    if (!user) {
      throw new AppError("User register failed please try again", 400);
    }

    await user.save();
    user.password = undefined;

    const token = user.generateToken();
    res.cookie("token", token, cookieOption);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (typeof next === "function") {
      return next(error);
    }

    // fallback (rare case)
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("All fields are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid email or password", 400);
    }

    const token = user.generateToken();
    user.password = undefined;

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(AppError("internal error", error));
  }
};


// logout
const logout = async (req, res,next) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// get profile
const getProfile = async (req, res, next) => {
 try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getProfile };

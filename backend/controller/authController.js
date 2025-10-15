import { User } from "../entities/userEntity.js";

import bcrypt from "bcrypt";
import { createJWT } from "../service/userService.js";

export const register = async (req, res) => {
  const user = req.user;
  let savedUser;

  try {
    savedUser = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  if (!savedUser) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while trying to create a new user!",
    });
  }

  savedUser.password - undefined;

  return res.status(201).json({
    success: true,
    message: "Register succesful!",
    data: savedUser,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email }); // eger object icinde object aramasi yapiliyorsa sorgu bu sekilde atilir
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "There is no such a user!",
    });
  }

  if (!user.isActive) {
    return res.status(400).json({
      success: false,
      message: "Inactive user, please get contact support service!",
    });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    res.status(401).json({
      success: false,
      message: "Username or password is wrong!",
    });
  }

  const token = createJWT(user._id);
  user.password = undefined;

  return res
    .cookie("token", token, { sameSite: "none", httpOnly: true })
    .status(200)
    .json({
      success: true,
      message: "Login successful!",
      token,
      user,
    });
};

export const logout = (req, res) => {
  const token = req.cookies.token;

  console.log(token);

  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

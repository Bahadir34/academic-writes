import { User } from "../entities/userEntity.js";

export const getAllUsers = (req, res) => {
  let user = req.user;
  user.password = undefined;
  user._id = undefined;
  user.__v = undefined;
  return res.status(200).json({
    success: true,
    messsage: "This is getAllUser endpoint!",
    user,
  });
};

export const userCount = async (req, res) => {
  const users = await User.find();

  if (!users.length) {
    return (
      res.status(404),
      json({
        success: false,
        message: "Could not find any user!",
      })
    );
  }

  return res.status(200).json({
    success: true,
    message: "Successfully fetched counts of users!",
    number_of_users: users.length,
  });
};

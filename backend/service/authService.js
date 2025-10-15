import { User } from "../entities/userEntity.js";

export const isUserUnique = async (req, res, next) => {
  try {
    const alreadySavedUser = await User.find({ email: req.body.email });

    console.log(alreadySavedUser);

    if (alreadySavedUser.length) {
      return res.status(400).json({
        success: false,
        message: "The user wanted to register is already registered before!",
      });
    } else {
      req.user = req.body;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while looking for the user is unique!",
    });
  }
};

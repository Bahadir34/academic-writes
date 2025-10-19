import jwt from "jsonwebtoken";
import { User } from "../entities/userEntity.js";

export const tokenValidation = async (req, res, next) => {
  // middleware kullanilacaksa siralama daima bu sekilde olmali (req,res,next) =>{}
  const token = req?.cookies?.token || req.headers.authorization;

  console.log("TOKEN : ", token);

  if (token === undefined || token === "") {
    return res.status(400).json({
      success: false,
      message: "Authorization required!",
    });
  }
  let isValid;
  try {
    isValid = jwt.verify(token, process.env.API_KEY_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid!",
    });
  }

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }

  const { id } = jwt.decode(token, process.env.API_KEY_SECRET);

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "There is no such a user!",
    });
  }

  req.user = user;

  next();
};

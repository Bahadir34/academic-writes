import jwt from "jsonwebtoken";

export const createJWT = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.API_KEY_SECRET, {
    expiresIn: process.env.API_KEY_EXP,
  });
  return token;
};

 
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
import mongoose from "mongoose";

const mongoConfig = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connection is successfully!");
    })
    .catch((err) => {
      console.log(
        "Something went wrong while trying to connect DB : ",
        err.message
      );
    });
};

export default mongoConfig;

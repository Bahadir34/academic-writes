import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userEntity = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "User must have a firstname!"],
      match: [/^[A-Za-zÇĞİÖŞÜçğıöşü\s]+$/, "Firstname must be created from only alphabetical characters!"]
    },
    lastName: {
      type: String,
      required: [true, "User must have a lastname!"],
     match: [/^[A-Za-zÇĞİÖŞÜçğıöşü\s]+$/, "Firstname must be created from only alphabetical characters!"]
    },

    email: {
      type: String,
      required: [true, "User must have an email!"],
      unique: [true, "User must have an unique email!"],
      validate: [validator.isEmail, "Please enter a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      validate: [validator.isStrongPassword, "Please enter a strong password!"],
    },

    assays: {
      type: [Schema.ObjectId],
      ref: "Assay",
    },
    likedAssays: {
      type: [Schema.ObjectId],
      ref: "Assay",
    },

    isActive: {
      type: Boolean,

      required: [
        true,
        "Please enter the situation of user! (active or inactive)",
      ],
    },
    passChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userEntity.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = mongoose.model("User", userEntity);

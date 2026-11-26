
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  bio: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];

  // Password reset fields
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 150,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Store the hashed password reset token
    resetPasswordToken: {
      type: String,
      default: null,
    },

    // Store the token expiration time
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

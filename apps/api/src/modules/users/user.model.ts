
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password?: string;

  googleId?: string;
  authProvider: "local" | "google";
  isEmailVerified: boolean;

  profileImage: string;
  bio: string;

  followers: Types.ObjectId[];
  following: Types.ObjectId[];

  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    // Basic Information
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

    // Authentication
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      select: false,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Profile Information
    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 150,
    },

    // Social Relationships
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

    // Password Reset
    resetPasswordToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const User = mongoose.model<IUser>("User", userSchema);

export default User;



// import mongoose, { Schema, Document, Types } from "mongoose";

// export interface IUser extends Document {
//   fullName: string;
//   username: string;
//   email: string;
//   password: string;
//   profileImage: string;
//   bio: string;
//   followers: Types.ObjectId[];
//   following: Types.ObjectId[];

//   // Password reset fields
//   resetPasswordToken: string | null;
//   resetPasswordExpires: Date | null;
// }

// const userSchema = new Schema<IUser>(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     profileImage: {
//       type: String,
//       default: "",
//     },

//     bio: {
//       type: String,
//       default: "",
//       maxlength: 150,
//     },

//     followers: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     following: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     // Store the hashed password reset token
//     resetPasswordToken: {
//       type: String,
//       default: null,
//     },

//     // Store the token expiration time
//     resetPasswordExpires: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model<IUser>("User", userSchema);

// export default User;

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { fullName, username, email, password, confirmPassword } = req.body;

    //check required field
    if (!fullName || !username || !email || !password || !confirmPassword) {
      res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
      return;
    }

    //check  existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email and  username already exists ",
      });
      return;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

//update the logged -in  user's profile
// export const updateUserProfile=async(
//     req:Request,
//     res:Response,

// ): Promise<void> =>{
//     try{
//         //get the logged-in user's id from authentication middleware
//         const userId=res.locals.userId;

//         //get editable  profile field from the frontend
//         const {fullName,username,bio,profileImage}=req.body;

//         //check wheather atleast one field in provided
//         if(
//             fullName===undefined && 
//             username===undefined &&
//             bio=== undefined &&
//             profileImage===undefined
//         ){
//             res.status(400).json({
//         success: false,
//         message: "Please provide at least one field to update",
//       });
//       return;

//         }
//         //find the logged-i user
//         const user=await User.findById(userId);

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//       return;
//     }

//      // Check whether the new username belongs to another user
//     if (username !== undefined && username !== user.username) {
//       const existingUser = await User.findOne({ username });

//       if (existingUser) {
//         res.status(409).json({
//           success: false,
//           message: "Username already exists",
//         });
//         return;
//       }
//     }


//     }
// }



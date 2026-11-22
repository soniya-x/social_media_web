import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs"
export const loginUser=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try{
       const { email, password } = req.body;

       //check required field
       if(!email || !password){
        res.status(400).json({
            success:false,
            message:"Email and password are required"
        });
        return;
       }

       //find user by email
       const user=await User.findOne({email})

       if(!user){
        res.status(404).json({
            success:false,
            message:"User not found"
        });
        return;

       }
       //compare password
       const isPasswordMatch=await bcrypt.compare(
        password,
        user.password
       );

       if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    //Generate JWT Token
    const secret=process.env.JWT_SECRET;

    if(!secret){
        throw new Error("JWT_SECRET is missing")
    }
    
    const token=jwt.sign(
        {userId:user._id.toString()},
        secret,
        {expiresIn:"7d"}

    );
    res.status(200).json({
        success:true,
        message:"Login successful",
        token,
        user:{
            id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email

        },
    });


        
    }catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
}
}
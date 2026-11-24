import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
//This generates a secure random token and hashes it before storing it in MongoDB.
import crypto from "crypto";
import { sendEmail } from "../services/email.services";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/user.validation";

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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    //check required field
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    //find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    //Generate JWT Token
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get email from frontend request
    // const { email } = req.body;

 // Validate email using Zod
const validation = forgotPasswordSchema.safeParse(req.body);

if (!validation.success) {
  res.status(400).json({
    success: false,
    message: validation.error.issues[0].message,
  });
  return;
}

    // Normalize email
    const normalizedEmail = validation.data.email.toLowerCase();

    // Find user using email
    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Generic response to prevent email enumeration
    const message =
      "If an account exists with this email, a password reset link has been sent.";

    if (!user) {
      res.status(200).json({
        success: true,
        message,
      });
      return;
    }

    // Generate secure random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing in database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry to 15 minutes
    const resetTokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Save hashed token and expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    // Validate frontend URL
    const clientUrl = process.env.CLIENT_URL;

    if (!clientUrl) {
      throw new Error("CLIENT_URL is missing");
    }

    // Create reset password URL
    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    // Create email template
    const emailTemplate = `
      <h2>Reset Your SocialGram Password</h2>
      <p>You requested a password reset.</p>
      <p>Click below to create a new password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request this, ignore this email.</p>
    `;

    try {
      // Send reset password email
      await sendEmail(
        user.email,
        "Reset Your SocialGram Password",
        emailTemplate
      );
    } catch (error) {
      // Clear token if email sending fails
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      throw error;
    }

    // Send success response
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to process password reset request",
    });
  }
};



export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Step 1: Get reset token from URL parameters
    const { token } = req.params;

    // Step 2: Validate password data using Zod
    const validation = resetPasswordSchema.safeParse(req.body);

    // Return validation error if request body is invalid
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: validation.error.issues[0].message,
      });
      return;
    }

    // Step 3: Get validated password
    const { password } = validation.data;

    // Step 4: Hash the token received from the email link
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Step 5: Find user with matching token that has not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    // Step 6: Check whether token is valid or expired
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link",
      });
      return;
    }

    // Step 7: Hash the new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 8: Update user's password
    user.password = hashedPassword;

    // Step 9: Clear reset token fields to prevent token reuse
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Step 10: Save updated user in MongoDB
    await user.save();

    // Step 11: Send success response
    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login.",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};



export const getUserProfile = async (
  req: Request,
  res: Response,
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
export const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the logged-in user's ID
    const userId = res.locals.userId;

    // Get editable profile fields
    const { fullName, username, bio, profileImage } = req.body;

    // Check whether at least one field is provided
    if (
      fullName === undefined &&
      username === undefined &&
      bio === undefined &&
      profileImage === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
      return;
    }

    // Find the logged-in user
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Check whether the new username belongs to another user
    if (username !== undefined && username !== user.username) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "Username already exists",
        });
        return;
      }
    }

    // Update only the fields provided by the frontend
    if (fullName !== undefined) user.fullName = fullName;
    if (username !== undefined) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (profileImage !== undefined) user.profileImage = profileImage;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

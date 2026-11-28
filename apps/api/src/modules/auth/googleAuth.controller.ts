
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../users/user.model";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { credential } = req.body as {
      credential?: string;
    };

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google credential",
      });
    }

    const {
      sub: googleId,
      name,
      email,
      picture,
      email_verified,
    } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email is not verified",
      });
    }

    // Find existing Google user
    let user = await User.findOne({ googleId });

    // Create new user if not found
    if (!user) {
      // Check existing email account
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "An account already exists with this email. Please login using your existing method.",
        });
      }

      // Generate unique username
      const baseUsername =
        email.split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "") || "user";

      let username = baseUsername;
      let count = 1;

      while (await User.exists({ username })) {
        username = `${baseUsername}${count++}`;
      }

      // Create user according to User Schema
      user = await User.create({
        fullName: name || username,
        username,
        email,
        googleId,
        profileImage: picture || "",
        authProvider: "google",
        isEmailVerified: true,
        bio: "",
        followers: [],
        following: [],
      });
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Return sanitized user data
    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        isEmailVerified: user.isEmailVerified,
        authProvider: user.authProvider,
      },
    });

  } catch (error: unknown) {
    console.error("Google Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};



// import { Request, Response } from "express";
// import { OAuth2Client } from "google-auth-library";
// import jwt from "jsonwebtoken";
// import User from "../models/User";

// const googleClient = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID
// );

// export const googleLogin = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {

//   console.log("controllers/auth.controller sdasdas")
//   try {
//     const { credential } = req.body as {
//       credential?: string;
//     };

//     if (!credential) {
//       return res.status(400).json({
//         message: "Google credential is required",
//       });
//     }

//     // Verify Google ID token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     if (!payload) {
//       return res.status(401).json({
//         message: "Invalid Google token",
//       });
//     }

//     const {
//       sub: googleId,
//       name,
//       email,
//       picture,
//       email_verified,
//     } = payload;

//     if (!email || !email_verified) {
//       return res.status(401).json({
//         message: "Google email is not verified",
//       });
//     }

//     // Find existing user or create new user
//     let user = await User.findOne({ googleId });

//     if (!user) {
//       user = await User.findOne({ email });

//       if (user) {
//         return res.status(409).json({
//           message:
//             "An account already exists with this email. Please log in using your existing method.",
//         });
//       }

//       user = await User.create({
//         googleId,
//         name: name || "",
//         email,
//         profilePicture: picture || "",
//         authProvider: "google",
//         isEmailVerified: true,
//       });
//     }

//     // Generate application JWT
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not configured");
//     }

//     const token = jwt.sign(
//       { userId: user._id.toString() },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Google login successful",
//       token,
//       user,
//     });

//   } catch (error: unknown) {
//     console.error("Google Login Error:", error);

//     return res.status(401).json({
//       message: "Google authentication failed",
//     });
//   }
// };

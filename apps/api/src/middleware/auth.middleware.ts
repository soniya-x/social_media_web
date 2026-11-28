import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import env from "../config/env";

interface JwtPayload{
    userId:string;
}

export const authMiddleware=(
    req:Request,
    res:Response,
    next:NextFunction
):void =>{
    try{
        //get token from the authorization header
         const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                success:false,
                message:"Access denied. No token provided"

            });
            return;
        }
        const token=authHeader.split(" ")[1]
        const secret= env.JWT_SECRET;

    if(!secret){
        throw new Error("JWT_SECRET is missing")
    }
    // Verify JWT token
    const decoded=jwt.verify(token,secret) as JwtPayload;
    // console.log("MIDDLEWARE JWT SECRET EXISTS:", Boolean(env.JWT_SECRET));

    //store authenticated user Id in request 
    res.locals.userId=decoded.userId;
    next()

    }catch(error){
        res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}
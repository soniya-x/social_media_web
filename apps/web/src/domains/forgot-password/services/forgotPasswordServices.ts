import api from "@/lib/axios";

import type { ForgotPasswordPayload } from "../types/forgotPasswordType";
import { response } from "express";

//send forget-password request to backend
export const forgotPasswordServices=async(
    data:ForgotPasswordPayload
)=>{
    const response=await api.post('/users/forgot-password',data)
    return response.data;
}

//This file responsible to communicate  with the backend
import api from "@/lib/axios";

export const getUserProfile =async()=>{
    const token=localStorage.getItem("token")

    const response=await api.get("/users/profile",{
        headers:{
            Authorization:`Bearer ${token}`,

        },

    });
    return response.data.user;

}
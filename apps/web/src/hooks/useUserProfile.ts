"use client"
import { useEffect,useState } from "react"
import { getUserProfile } from "@/domains/profile/services/profileService";
import { User } from "@/types/main/user.types";


export default function useUserProfile(){
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    const fetchProfile=async()=>{
        try{
            const data=await getUserProfile();
            setUser(data.user);

        }catch(error){
            setError("Failed to fetch user profile")
        } finally{
            setLoading(false)
        }
    };
    fetchProfile();
  },[]);
  return {user,loading,error}

}
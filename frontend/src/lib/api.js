import { axiosInstance } from "./axios";

export const getStreamtoken=async()=>{
    const response=await axiosInstance.get("/api/chat/token");
    return response.data;
}
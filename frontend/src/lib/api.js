import { axiosInstance } from "./axios";

export const getStreamtoken=async()=>{
    const response=await axiosInstance.get("/chat/token");
    return response.data;
}
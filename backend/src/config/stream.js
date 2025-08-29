import {StreamChat} from 'stream-chat'
import { ENV } from './env.js'

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY,ENV.STREAM_SECRET_KEY)

export const upsertstreamuser=async(userdata)=>{
    try{
        await streamClient.upsertUser(userdata)
        console.log("Stream user upserted seccessfully",userdata.name)
        return userdata
    }
    catch(error){
        console.log("Error Upserting stream user",userdata.name)
    }
}

export const deletestreamuser=async(userId)=>{
    try{
        await streamClient.deleteUser(userId)
        console.log("Stream user Deleted seccessfully",userId)
        return userdata
    }
    catch(error){
        console.log("Error Deleting stream user",userdata.name)
    }
}

export const generateStreamToken=async(userId)=>{
    try{
       const userIdString=userId.toString();
       return streamClient.createToken(userIdString);
    }
    catch(error){
        console.log("Error Deleting stream token",userdata.name)
        return null;
    }
}
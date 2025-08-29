import { Inngest } from "inngest";
import  connectDB  from "./db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "CollabSpace" });

const syncUser = inngest.createFunction(
    {id : "sync-user"},
    {clerk : "clerk/User.created"},
    async ({event}) =>{
        await connectDB();
        const {id,email_addresses,first_name,last_name,image_url}=event.data
        const newUser ={
            clerkId :id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`, 
            image: image_url,
        }
        await User.create(newUser)
    }
)


const deleteuserFromDB = inngest.createFunction(
    {id : "delete-user-frob-db"},
    {clerk : "clerk/User.deleted"},
    async ({event}) =>{
        const {id}=event.data;
        await User.deleteOne({clerkId : id});
        // await deleteStreamUser(id.toString());
    });
export const functions = [syncUser];
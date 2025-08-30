import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../models/user.model.js";
import { StreamChat } from "stream-chat";
import { deletestreamuser, upsertstreamuser } from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "CollabSpace" });

/**
 * Function: Sync user when Clerk fires "User.created"
 */
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },   // 👈 must be "event"
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      image: image_url,
    };

    await User.create(newUser);

    await upsertstreamuser({
        id:newUser.clerkId.toString(),
        name:newUser.name,
        image:newUser.image,
    })
  // return { deleted: true };
  }
);

/**
 * Function: Delete user when Clerk fires "User.deleted"
 */
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },   // 👈 must be "event"
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deletestreamuser(id.toString())
    // return { deleted: true };
  }
);

export const functions = [syncUser, deleteUserFromDB];

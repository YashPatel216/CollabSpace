import express from 'express'
import {ENV} from './config/env.js'
import connectDB from './config/db.js';  
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from './config/inngest.js'
import { serve } from "inngest/express";
const app=express()

app.use(clerkMiddleware());

app.use(express.json())
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get('/',(req,res)=>{
    res.send("hello")
})

// console.log(ENV.MONGO_URI)





const startserver = async ()=>{
    try{
        await connectDB();
        if(ENV.NODE_ENV ==="development"){
            app.listen(ENV.PORT,()=>console.log("Server Started"),
              connectDB()
        )
        }
    }catch(error){
            console.log("Error in connecting to server",error)
            process.exit(1)
    }
}

startserver()


export default app;


// tilvatirth123_db_user
// aA3IUmdDBWqm5f3r
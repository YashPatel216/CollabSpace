import express from 'express'
import {ENV} from './config/env.js'
import connectDB from './config/db.js';  
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from './config/inngest.js'
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js"
import cors from 'cors'

const app=express()

//only allow request from 5001 port only and alos allow to send cookie
app.use(cors({origin:"http://localhost:5173",credentials:true,}))

app.use(clerkMiddleware());  // req.auth will be available in the request object

app.use(express.json())
app.use("/api/inngest", serve({ client: inngest, functions}));

 app.use("/api/chat",chatRoutes);

app.get('/',(req,res)=>{
    res.send("hello")
})



const startserver = async ()=>{
    try{
        // await connectDB();
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
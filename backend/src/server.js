import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'
const app=express()


app.get('/',(req,res)=>{
    res.send("hello")
})

// console.log(ENV.MONGO_URI)



app.listen(ENV.PORT,()=>console.log("Server Started"),
    connectDB()
)



// tilvatirth123_db_user
// aA3IUmdDBWqm5f3r
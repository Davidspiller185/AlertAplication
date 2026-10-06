import express from "express"
import "dotenv/config"
import cors from "cors"
import router from './routes/routeAlert.js'
import { success } from "zod"

const app = express()

app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}))

app.use(express.json())

app.use(router)


app.use((req,res) => {
    res.status(404).json({success:false, message: "not found andpoint"})
})

app.use((error,req,res,next) =>{
    res.status(error.status | 500).json({success:false, message:error.message})
})

app.listen(3000, () => {console.log("server listen on port 3000")})

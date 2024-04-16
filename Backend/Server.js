import express from 'express';
import { json } from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import Userroute from './Routes/Userroute.js'
import Homeroutes from './Routes/Homeroutes.js'
const Mongo_URL="mongodb+srv://Ritesh:123@cluster1.lgo3ddb.mongodb.net/Attendence";
const app = express();
app.use(json());
app.use(cors());
app.use(Userroute)
app.use(Homeroutes)
const PORT = 8080;
app.get('/', (req, res) => {
    return res.status(200).send({
        message: "welcome"
    });
});
mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("connnected");
    app.listen(PORT, () => {
        console.log(`server is running ${PORT}`);
    });
    
})
.catch(()=>{
    console.log("error");
})

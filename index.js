import "dotenv/config";
import express from 'express';
import cors from "cors";
import router from './router/index.js';

const app = express();
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());
app.use('/',router);
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is started port: ${port}`);
    
})
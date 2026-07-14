import 'dotenv/config'
import express from 'express'
import {sendEmailToMehul} from './email.js'
import cors from 'cors'
import {redis} from './redis.js'

const app = express();
const PORT = process.env.PORT || 80
const BASE_URL = process.env.CLIENT_URL

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    methods:["GET", "POST"],
    origin:BASE_URL
}))

app.get('/', async (_, res) => {
  return res.status(200).json({ message: 'Portfolio API is running' })
})

let localViewsFallback = 1;

app.get('/api/views', async (_, res) => {
  try {
   const existingViews = await redis.get('viewer')
   if(!existingViews){
      redis.set('viewer',1)
   }
     const views = await redis.incr('viewer');
     return res.status(200).json({ views: Number(views) });
  } catch (err) {
     console.error("Redis increment error, using in-memory fallback:", err);
     return res.status(200).json({ views: localViewsFallback });
  }
})

app.post('/api/post', async (req, res) => {
   try {
      const { name, email, message } = req.body;

      await sendEmailToMehul(name, email, message);

      return res.status(200).json({
         success: true,
         message: "Email sent successfully"
      });

   } catch (err) {
      console.log(err);

      return res.status(500).json({
         success: false,
         message: "Failed to send email"
      });
   }
});

app.get('/health',(_,res) => {
   
  return res.status(200).json({message:"ok"});
})

app.listen(PORT,() => {
    console.log(`Server is running On Port ${PORT}`);
})
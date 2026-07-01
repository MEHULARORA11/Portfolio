import 'dotenv/config'
import express from 'express'
import {sendEmailToMehul} from './email.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 80
const BASE_URL = process.env.CLIENT_URL

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    methods:"POST",
    origin:BASE_URL
}))

app.get('/', (_, res) => {
  return res.status(200).json({ message: 'Portfolio API is running' })
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
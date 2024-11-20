const express = require('express');
const cors = require('cors');
 const app = express();

 var corOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200
}


//middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))// middleware for req.body headers


//routes
const router = require('./routes/productRoutes')
app.use('/api/products',router)  


app.get('/',(req,res)=>{
    res.json({message: "Welcome to our API"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port${PORT}`)
})
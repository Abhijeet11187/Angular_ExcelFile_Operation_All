const express =require('express');
const app=express();
const bodyparser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const excelRoutes=require('./api/routes/excel');

mongoose.connect('mongodb+srv://Abhi:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop-yakve.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true 
})

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json()); 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

  app.use('/upload',express.static('upload'));

app.use('/excel',excelRoutes);


app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
   
  });
  
  app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.json({error:{message:error.message }});
  
  });
module.exports=app;
 const express = require('express')
 const bcrypt = require('bcrypt')
 const User = require('./config.js')
 const multer = require('multer')
 const Product = require('./models/product.schema.js')
 require('dotenv').config();
 const cloudinary = require('../helpers/cloudinary.js')
 const cors = require('cors')
 const fs = require('fs')
const { url } = require('inspector')


 const app = express();
 app.use(cors());

 const port = process.env.PORT || 4000;
 
 const storage = multer.diskStorage({
    
    destination: function(req , file ,cb){
        return cb(null, './uploads');
    },
    filename: function(req , file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
 })

 const uploades = multer({storage}).array('image', 5)



 app.use(express.json());
 app.use(express.urlencoded({extended: false}))
 
 app.set('view engine' , 'ejs');

 app.get('/', (req , res)=>{
    res.render('login')
 })

 app.get('/all' , async(req ,res) =>{
      const data = await Product.find({})
      res.send(data)
 })

 //register user
 app.post('/' , async(req , res) => {
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    const hasspass = await bcrypt.hash(data.password, 10)
    data.password = hasspass;
    const user = await User.create(data);
    console.log(user)

 })

// login user
  app.post('/login', async(req ,res)=> {
       try{
           const check = await User.findOne({name: req.body.username})
           if(!check){
             res.send('user not found')
           }
        const match = await bcrypt.compare(req.body.password , check.password)
        if(match){
            res.render('home')
        }else{
            res.send('wrong password')
        }
       }catch{
            res.send('worng detail')
       }
  })

  app.delete('/del' , async(req ,res) => {
         await Product.deleteMany({})
         console.log('seucess')
  })



  app.post('/addProduct', uploades , async(req , res)=>{

    const uploader = async(path) => cloudinary.uploads(path)
    const urls = []
    const files = req.files
    for(const file of files){
      const {path} = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    
    const path =  urls.map(arr => arr.secure_url)

       try{
          const data = {
            title:req.body.title,
            price:req.body.price,
            disscount:req.body.disscount,
            discription:req.body.discription,
            image:path
          }

        await Product.create(data)
        res.render('home')
       console.log(data)

       }catch{
         res.send('somthing went wrong')
       }
  })

  

 
 app.listen( port ,()=>{
    console.log('sytem is runings',)
    
})
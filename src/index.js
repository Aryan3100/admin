 const express = require('express')
 const bcrypt = require('bcrypt')
 const User = require('./config.js')
 const multer = require('multer')
 const Product = require('./models/product.schema.js')
 require('dotenv').config();
 
 const storage = multer.diskStorage({
    destination: function(req , file ,cb){
        return cb(null, './uploads');
    },
    filename: function(req , file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
 })

 const upload = multer({storage}).array('image', 5)

 const app = express();

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



  app.post('/addProduct', upload , async(req , res)=>{
       try{

        const path = req.files.map(arr => arr.path )
        
          const data = {
            title:req.body.title,
            price:req.body.price,
            disscount:req.body.disscount,
            discription:req.body.discription,
            image:path
          }
       
        await Product.create(data)
        res.render('home')
    //    return res.redirect('home')

       }catch{
         res.send('somthing went wrong')
       }
  })

  

 
 app.listen( process.env.PORT ,()=>{
    console.log('sytem is runings',)
    
})
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');


mongoose.set("strictQuery", false);

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

//connect database
const connection = "mongodb+srv://mohamed:mohamed@cluster0.bzr9h8x.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongooseAtles');
  })
  .catch((error) => {
    console.error('Error connecting to MongooseAtles:', error);
  });

//create user

// const user = new User({
//     name : 'mohamed felah',
//     age : 27,
//     email : 'mohamed@test.com',
//     password : 'pass',
// });
// user.save()
// .then(() =>{
//     console.log('user create success')
// })
// .catch((error) =>{
//     console.log(error.massage);
// })

//Return all users

app.get("/users" , async(req,res) =>{
  try{
    await User.find({}).then((result) =>{
      res.send(result);
    });
  }catch(err){
    console.log(err);
  }
});

// Add new users to the database
app.post("/add_user", async(req,res) => {
  try{
    let new_user = new User({
    name : req.body.name,
    age : req.body.age,
    email : req.body.email,
    password : req.body.password,
    });
    await new_user.save();
    res.send("save data");
  }catch(err){
    console.log(err);
  }
});

// EDIT A USER BY ID 
app.put("/update_user/:id", async(req,res) =>{
  try{
    await User.findOneAndUpdate({_id: req.params.id},{name : req.body.name});
    res.send("update success");
  }catch(err){
    res.send(err);
  }
});

//REMOVE A USER BY ID 

app.delete("/delete/:id", async(req,res) =>{
  try{
    await User.findOneAndDelete({_id: req.params.id});
    res.send("delete success");
  }catch(err){
    res.send(err);
  }
})





// start server

app.listen(port,() => {
    console.log(`the server listening on port ${port}`);
});


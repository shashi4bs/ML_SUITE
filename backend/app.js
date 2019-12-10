const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./usermodel');

const port = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ml-suite', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Connected to DB ml-suite");
});

app.route('/login').post((req, res)=>{
    let user = new userModel(req.body);
    userModel.find({"username": req.body.username}, function(err, u){
        if(!u){
            res.status(404).send("data not found"); 
        }else{
            u = u[0];
            // console.log(u);
            if(u.password === user.password){
                res.status(200).send("login Successful");
            }else{
                res.status(500).send("Invalid Password");
            }
        }
    });
});

app.route('/signup').post((req, res)=>{
    let user = new userModel(req.body);
    userModel.find({"username": req.body.username}, function(err, u){
        if(u.length===0){
            user.save().then(u=>{
                res.status(200).send('Success');
            }).catch(err=>{
                //res.status(500).send('Unable to update');
                res.json('Unable to update');
            })
        }else{
            //res.status(500).send("Username Taken choose another");
            console.log(u);
            res.json("Username already taken choose differrent username");
        }
    })
});


app.listen(port, ()=>console.log(`App listening on port ${port}`));

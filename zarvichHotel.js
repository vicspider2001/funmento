const express = require('express');
var zarvich = express();
const db2 = require('./db2');
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var MongoUrl = "mongodb+srv://zarvichhotels:funmiCanada@cluster0.rk1u0.mongodb.net/?retryWrites=true&w=majority";
var cors = require('cors')
const bodyparser = require('body-parser');
const res = require('express/lib/response');
var port = process.env.PORT || 1500;
var db;
const AuthController = require('./auth/authController');



zarvich.use(bodyparser.urlencoded({extended:true}));
zarvich.use(bodyparser.json());
zarvich.use(cors());
zarvich.use(express());
zarvich.use('/api/auth', AuthController)

zarvich.get('/',(re,res)=>{
    res.send("This is root page")
})

//return all meals
zarvich.get('/meals', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
//return mealtypes wrt meal ID
    else if(req.query.mealnames){
        var mealnames = (req.query.mealnames)
        query={mealname:(mealnames)}
    }

    db.collection('meals').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//return all meal Categories
zarvich.get('/menu', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
//return menu wrt menu
    else if(req.query.mealmenu){
        var mealmenu = (req.query.mealmenu)
        query={menu:(mealmenu)}
    }

    db.collection('menuCategory').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Edit Price
zarvich.put('/editprice/:id',(req,res)=>{
    console.log(req.params.id);
    var id = (req.params.id)
    db.collection('meals').updateOne(
        {_id:id},
        {
            $set: {
                mealname:req.body.mealname,
                mealimage:req.body.mealimage,
                price:req.body.price,
                menuCategory:req.body.menuCategory
                
            }
        },
        
    )
    res.send('data updated')      
  
})

//delete a meal
zarvich.delete('/delMeal/:id',(req,res)=>{
    var id = req.params.id
    db.collection('meals').deleteOne(
        {_id:id},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//delete a mealCategory
zarvich.delete('/delCategory/:id',(req,res)=>{
    var id = req.params.id
    db.collection('menuCategory').deleteOne(
        {_id:id},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Post a new meal
zarvich.post('/addMeal',(req,res)=>{
	console.log(req.body);
	db.collection('meals').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Check in Complete")
	})
})

// Post a new mealCategory
zarvich.post('/addCategory',(req,res)=>{
	console.log(req.body);
	db.collection('menuCategory').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Check in Complete")
	})
})

// Post a new HomeCarousel
zarvich.post('/addCarousel',(req,res)=>{
	console.log(req.body);
	db.collection('homepageCarousel').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Post a new order
zarvich.post('/addOrders',(req,res)=>{
	console.log(req.body);
	db.collection('mealOrders').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Register customer Account
zarvich.post('/newCustomer',(req,res)=>{
	console.log(req.body);
	db.collection('customersAccount').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

//get meal order
zarvich.get('/getOrders', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }

//return meal order wrt orderNum
    else if (req.query.orderNum){
        var orderNum=(req.query.orderNum)
        query={'orderID':(orderNum)}
    }

   db.collection('mealOrders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


////////////////////////////////////////////////////////Funmi

MongoClient.connect(MongoUrl, (err,client) => {
    if(err) console.log("error while connecting");
    db = client.db('funmento');
    zarvich.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})


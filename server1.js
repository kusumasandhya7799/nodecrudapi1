
const express=require('express')
const bodyParser=require('body-parser')
const MongoClient=require('mongodb').MongoClient
const req = require('express/lib/request')
const app=express()

    app.use(bodyParser.urlencoded({extended:true}))
    const connectionString="mongodb+srv://kusuma:87654321@cluster0.visvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    
    MongoClient.connect(connectionString,{useUnifiedTopology:true}).
         then(client=>{
        
    console.log('connection to database server')
    const db=client.db('star-war-quotes')
    const quotesCollection=db.collection('qoutes')

    app.post('/qoutes',(req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result=>{
            res.send(result)
            })
        .catch(error=>console.error(error))
        })

    app.get('/getall',(req,res)=>{
        db.collection('quotes').find().toArray()
        .then(result=>{
            res.send(result)
            })
        .catch(error=>console.error(error))
        })
    
}).catch(console.error)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
    })

const PORT=3000

app.listen(PORT,()=>{
        console.log(`server running at port ${PORT}`)
    })
   
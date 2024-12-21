const express = require("express");
const cookieParser = require('cookie-parser')
const URLRoute = require('./routes/url')
const {connectToMongoDB} = require('./connect')
const URL = require('./models/url')
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth')

const app=express();
const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
    console.log("mongo DB connected")
})

app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use((req,res)=>{})

app.use('/url',restrictToLoggedInUserOnly,URLRoute)
app.use('/user', userRoute)
app.use('/' ,checkAuth,staticRoute)

app.get('/new', async(req,res)=>{
    const allUrl = await URL.find({})
    return res.render('home',{
        urls : allUrl
    })
})

app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId
    const entry = await  URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory: {timeStamp: Date.now()}
        }
    })
    // res.redirect(entry.redirectURL)
})



app.listen(PORT,()=>{
    console.log(`server listing on port ${PORT}`)
})
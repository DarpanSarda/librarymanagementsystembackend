const express = require('express');
const cors = require('cors');
const {DbConnect} = require('./Config/Dbconnect');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser'); 

dotenv.config({
    path: './.env'
})

// const UserRoute = require("./Routes/User/UserRoute");
// const BookRoute = require("./Routes/Books/BookRoute");
// const IssueRoute = require("./Routes/Issue/IssueRoute");
// const TrendRoute = require("./Routes/Trending/TrendingRoute")

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieparser());

app.get("/",(req,res)=>{res.send("hello")})


const UserRoute = require('./Routes/User.Routes');

app.use("/api/v1/auth",UserRoute);


app.listen(PORT,async()=>{
    await DbConnect();
    console.log("server started")
})
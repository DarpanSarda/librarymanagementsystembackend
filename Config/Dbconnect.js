const mongoose = require("mongoose")
const DB_NAME = require('./Constants');

const DbConnect=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)  
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports={DbConnect}
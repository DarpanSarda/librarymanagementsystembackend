const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    street:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    isAuthor:{
        type:Boolean,
        default:false,  
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"author"
    },
    mobile:{
        type:String,
        require:true
    },
},{
    timestamps : true,
})

const AddressModel = mongoose.model('Address',AddressSchema);
module.exports = AddressModel;
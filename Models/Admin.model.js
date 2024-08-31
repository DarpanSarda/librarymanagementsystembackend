const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    Admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    }
}
,
{
    timestamps:true,
})

const AdminModel = mongoose.model('Admin',AdminSchema);
module.exports = AdminModel;
const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
    },
    email:{
        type:String,
    },
    Address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    }],
    Books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books',
    }],
    Volume:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Volume'
    }]
},
{
    timestamps:true,
});

const AuthorModel = mongoose.model('Author',AuthorSchema);
module.exports = AuthorModel;
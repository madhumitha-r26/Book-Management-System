const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    surname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    issuedBook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        require:false,
    },
    returnDate:{
        type:String,
        require:true,
    },
    subscriptionType:{
        type:String,
        require:true,
    },
    subscriptionDate:{
        type:String,
        require:true,
    },
},

{
    timestamp:true,
});


module.exports=mongoose.model("User",userSchema);
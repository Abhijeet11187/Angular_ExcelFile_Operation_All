const mongoose = require('mongoose');


const recordSchema = mongoose.Schema({
 
    emp_code:{type:String},
    mng_code:{type:String},

    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    status:{type:String}

});

module.exports=mongoose.model('Records',recordSchema);
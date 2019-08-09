const mongoose = require('mongoose');


const ExcelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
datasheet:{type:String}

});

module.exports=mongoose.model('Excelsheet',ExcelSchema);
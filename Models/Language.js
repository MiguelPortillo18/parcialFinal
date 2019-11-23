const mongoose = require('mongoose');
const {Schema} = mongoose;

const languageSchema = new Schema({
    languageName:{
        type:String, 
        unique:true, 
        required:true
    },
    anioLanzamiento: {
        type:Number, 
        required:true
    },
    tipo: {
        type:String, 
        enum:['interpretado','compilado']
    },
    creador: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('users',languageSchema);

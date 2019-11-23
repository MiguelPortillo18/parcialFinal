/*Conexion a la base de datos */
const mongoose = require('mongoose');
const {mongodb} = require('./key');

//Abriendo la conexion
mongoose.connect(mongodb.URI,{
    useCreateIndex: true,
    useNewUrlParser:true
})
.then(db=>console.log("Conexion establecida exitosamente!"))
.catch(err=>console.error(err));
//librerias
const express = require('express');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
const bodyParser = require('body-parser') //obtener info de postman
const cors = require('cors');
const { response } = require('express');


//usar metodos de las librerias
const app = express();
require('dotenv').config();

//midelwares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cors())

//setup de database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => { console.log("Conexion BD Exitosa")})
.catch(err => console.error(err));

//rutas
app.use('/api/category', require('./routes/category'))
app.use('/api/videogame', require('./routes/videogame'))
app.use('/api/auth', require('./routes/auth'));

//Oir aplicacion en puerto
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor MERN esta ejecutado en ${port}`);
})
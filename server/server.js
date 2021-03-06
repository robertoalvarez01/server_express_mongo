require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Carpeta Public
app.use(express.static(path.resolve(__dirname, '../public')))

app.use(require('./routes/index'));

const conexion = async() => {

    return await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

conexion()
    .then(res => console.log(res))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
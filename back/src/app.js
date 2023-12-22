const express = require ('express');
const morgan = require('morgan');
const config = require('./config');
const attractions = require('./modulos/attractions/rutas');
const clientes = require ('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');
const hotels = require('./modulos/hotels/rutas');
const cors = require('cors');

const app= express();

//Middleware
// app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//configuracion
app.set('port', config.app.port)

//routes
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use('/api/attractions', attractions);
app.use('/api/hotels', hotels);

module.exports = app;
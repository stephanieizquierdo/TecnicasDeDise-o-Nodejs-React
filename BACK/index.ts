import express from 'express';
import bodyParser from 'body-parser';
import { Estado , SingletonEstado } from './src/entities/CarritoDeCompra/Estado/Estado';
import Producto from './src/entities/CarritoDeCompra/Aplicable/Producto';
import FabricaDeReglas from './src/entities/Ofertas/Reglas/FabricaDeReglas';
import {Regla} from './src/entities/Ofertas/Reglas/Regla';
import MotorDeReglas from './src/entities/MotorDeReglas/MotorDeReglas';
import stateRoutes from './src/routes/stateRoutes';
import cartRoutes from './src/routes/carritoDeComprasRoutes';
import accountsRoutes from './src/routes/accountsRoutes';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });
const SERVER_API_PORT = process.env.SERVER_API_PORT;
const cors = require('cors');
const path = require('path');


interface JSONReglasYOfertasInterface {
    rules : {}[],
    offers: {}[],
}

const estado:Estado = SingletonEstado.getInstance();

const fs = require('fs');

//Inicializo el estado de los productos.
let jsonProdsParseado: {}[];
fs.readFile('./res/products.json', 'utf8', function (err:any, data:string) {
    if (err) throw err;
    jsonProdsParseado = JSON.parse(data);
    jsonProdsParseado.forEach(function(jsonProducto: any){
        estado.aniadirProducto(jsonProducto.code, new Producto(JSON.stringify(jsonProducto)));
    });
});

//Inicializo el estado de las ofertas y reglas
let jsonReglasYOfertas: JSONReglasYOfertasInterface;
fs.readFile('./res/offers.json', 'utf8', function (err:any, data:string) {
    if (err) throw err;
    jsonReglasYOfertas = JSON.parse(data);

    estado.inicializarOfertas(jsonReglasYOfertas);
});


const app = express();

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors());

stateRoutes(app);
cartRoutes(app);
accountsRoutes(app);

// serving static files
app.use(express.static('public'));

app.get('/check-status-api', (req, res) =>
    res.send(`Node and express server running on port ${SERVER_API_PORT}`)
);

let root = require('path').join(__dirname, 'build');

if(process.env.NODE_ENV === 'production'){
    root = require('path').join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    app.use('/*', (req,res) =>{
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    })
}


app.listen(SERVER_API_PORT, () => 
    console.log(`Your server is running on port ${SERVER_API_PORT}`)
);
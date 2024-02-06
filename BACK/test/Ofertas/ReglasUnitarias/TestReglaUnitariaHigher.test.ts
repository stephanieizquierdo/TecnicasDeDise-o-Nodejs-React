import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import CondicionHigher from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionHigher";

let chai = require('chai');
var assert = chai.assert;

describe('Regla Unitaria Higher', function(){

    it('Dada una regla higher que aplica para el producto aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let higher = new CondicionHigher(10,"PRODUCT.price");
        let regla = new ReglaUnitaria('00', "Regla higher", higher);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla higher que no aplica devuelve un resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let higher = new CondicionHigher(50,"PRODUCT.price");
        let regla = new ReglaUnitaria('00', "Regla higher", higher);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

});
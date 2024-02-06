import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import CondicionEquals from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionEquals";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';

let chai = require('chai');
var assert = chai.assert;

describe('Regla Unitaria Equals', function(){

    it('Dada una regla equals que aplica para el producto aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals("X033AXX","product.category.code");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla equals que aplica para el calendario aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals(1,"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla equals que aplica para el metodo de pago aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals("CREDIT","PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla equals para un producto que no aplica devuelve un resultado' , () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals("123456","product.category.code");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla equals para el calendario que no aplica devuelve un resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals(11,"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla equals para el metodo de pago que no aplica devuelve el resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let equals = new CondicionEquals("DEBIT","PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla equals", equals);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

});
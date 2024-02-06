import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import CondicionDistinct from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionDistinct";

let chai = require('chai');
var assert = chai.assert;

describe('Regla Unitaria Distinct', function(){

    it('Dada una regla distinct que aplica para el producto aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct("12345","product.category.code");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla distinct que aplica para el calendario aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct(12,"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla distinct que aplica para el metodo de pago aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct("DEBIT","PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla distinct para el producto que no aplica devuelve un resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct("Z001ABC","product.brand.code");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla distinct para el calendario que no aplica devuelve un resultado correcto', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct(1,"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla distinct para el metodo de pago que no aplica devuelve un resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct("CREDIT","PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla distinct", distinct);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

});
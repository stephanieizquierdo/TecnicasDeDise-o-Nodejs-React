import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import CondicionIn from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionIn";

let chai = require('chai');
var assert = chai.assert;

describe('Regla Unitaria In', function(){

    it('Dada una regla in que aplica para el producto aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla in que aplica para el calendario aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn([1,"FEBRUARY"],"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla in que aplica para el metodo de pago aplica correctamente', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["CREDIT","DEBIT"],"PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,true);
    });

    it('Dada una regla in para un producto que no aplica devuelve un resultado' , () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453K","AAR453R","AAR953J"],"product.category.code");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla in para el calendario que no aplica devuelve un resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn([11,12],"calendar.month");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

    it('Dada una regla in para el metodo de pago que no aplica devuelve el resultado correcto', () =>{
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["DEBIT","CASH"],"PAYMENT.method");
        let regla = new ReglaUnitaria('00', "Regla in", condicionIn);

        let resultado = regla.verificarRegla(producto,calendario,metodoDePago);

        assert.equal(resultado,false);
    });

});
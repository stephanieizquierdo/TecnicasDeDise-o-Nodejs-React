import DescuentoFijo from "../../src/entities/Ofertas/Descuentos/DescuentoFijo"

let chai = require('chai');
var assert = chai.assert;

describe("Descuento Fijo", ()=>{
    it("Deberia instanciarse correctamente al recibir un valor valido", ()=>{
        let error = false;
        try{
            let descFijo = new DescuentoFijo(20);
        }catch(exception:any){
            error = true;
        }
        assert.equal(error, false);
    });

    it("Deberia no instanciarse si el valor del descuento es negativo", ()=>{
        let error = false;
        try{
            let descFijo = new DescuentoFijo(-20);
        }catch(exception:any){
            error = true;
            assert.equal(exception.message, "El Valor -20 es invalido para instanciar el descuento.");
        }
        assert.equal(error, true);
    });

    it("Deberia no instanciarse si el valor del descuento es cero", ()=>{
        let error = false;
        try{
            let descFijo = new DescuentoFijo(0);
        }catch(exception:any){
            error = true;
            assert.equal(exception.message, "El Valor 0 es invalido para instanciar el descuento.");
        }
        assert.equal(error, true);
    });

    it("Con un descuento fijo bien instanciado y un valor base de producto de 100 al pedirle su descuento me devuelve su valor de descuento que es 10", ()=>{
        let descFijo = new DescuentoFijo(10);
        assert.equal(descFijo.getValorDescuento(1000), 10);
    });
});
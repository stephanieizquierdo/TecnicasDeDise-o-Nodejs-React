import DescuentoPorcentual from "../../src/entities/Ofertas/Descuentos/DescuentoPorcentual"

let chai = require('chai');
var assert = chai.assert;

describe("Descuento Porcentual", ()=>{
    it("Deberia instanciarse correctamente al recibir un valor valido (Entre 0 no inclusive y 100)", ()=>{
        let error = false;
        try{
            let descPorcentual = new DescuentoPorcentual(20);
        }catch(exception:any){
            error = true;
        }
        assert.equal(error, false);
    });

    it("Deberia no instanciarse si el valor del descuento es negativo", ()=>{
        let error = false;
        try{
            let descPorcentual = new DescuentoPorcentual(-20);
        }catch(exception:any){
            error = true;
            assert.equal(exception.message, "El Valor -20 es invalido para instanciar el descuento.");
        }
        assert.equal(error, true);
    });

    it("Deberia no instanciarse si el valor del descuento es cero", ()=>{
        let error = false;
        try{
            let descPorcentual = new DescuentoPorcentual(0);
        }catch(exception:any){
            error = true;
            assert.equal(exception.message, "El Valor 0 es invalido para instanciar el descuento.");
        }
        assert.equal(error, true);
    });

    it("Deberia no instanciarse si el valor del descuento es mayor a 100", ()=>{
        let error = false;
        try{
            let descPorcentual = new DescuentoPorcentual(100.0001);
        }catch(exception:any){
            error = true;
            assert.equal(exception.message, "El porcentaje del descuento porcentual no puede ser mayor a 100%");
        }
        assert.equal(error, true);
    });

    it("Con un descuento porcentual de 10% y un valor base de producto de 1000 al pedirle su descuento me devuelve 100", ()=>{
        let descPorcentual = new DescuentoPorcentual(10);
        assert.equal(descPorcentual.getValorDescuento(1000), 100);
    });
});
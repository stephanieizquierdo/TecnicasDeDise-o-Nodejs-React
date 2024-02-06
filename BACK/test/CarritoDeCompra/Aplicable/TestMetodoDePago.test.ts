import MetodoDePago from '../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago';

let chai = require('chai');
var assert = chai.assert;

const METODO = "PAYMENT.method"
const ENTIDAD = "PAYMENT.entity"

describe('Método de Pago', ()=>{
    it("Debería generarse correctamente con un JSON bien armado.", ()=>{
        let mDPago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CRÉDITO",
            "entity": "BANCO GALICIA"
        }));
        assert.equal(mDPago.metodo, "TARJETA DE CRÉDITO");
        assert.equal(mDPago.entidad, "BANCO GALICIA");
    });

    it("Debería tirar error si falta el metodo en el JSON de inicialización.", ()=>{
        let errorHappened = false;
        try{
            let mDPago = new MetodoDePago(JSON.stringify({
                "entity": "BANCO GALICIA", 
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar Método de Pago.");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);
    });

    it("Debería tirar error si falta la entidad en el JSON de inicialización.", ()=>{
        let errorHappened = false;
        try{
            let mDPago = new MetodoDePago(JSON.stringify({
                "method": "TARJETA DE CRÉDITO"
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar Método de Pago.");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);
    });
})
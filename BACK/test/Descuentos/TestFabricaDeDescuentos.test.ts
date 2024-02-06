import FabricaDeDescuentos from "../../src/entities/Ofertas/Descuentos/FabricaDeDescuentos"
import DescuentoPorcentual from "../../src/entities/Ofertas/Descuentos/DescuentoPorcentual"
import DescuentoFijo from "../../src/entities/Ofertas/Descuentos/DescuentoFijo"
import Descuento from "../../src/entities/Ofertas/Descuentos/Descuento"
import DescuentoPorcentualCarrito from "../../src/entities/Ofertas/Descuentos/DescuentoPorcentualCarrito";

let chai = require('chai');
var assert = chai.assert;

describe("Fabrica de Descuentos", ()=>{
    it("Debería crearse correctamente", ()=>{
        let error = false;
        try{
            let fabricaDescuentos = new FabricaDeDescuentos();
        }catch(exception: any){
            error=true;
        }
        assert.equal(error, false);
    });

    it("Al recibir un JSON invalido para crear un descuento deberia lanzar un error", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        try{
            fabricaDescuentos.crearDescuento(JSON.stringify({
                "type": "GUARANI",
                "value": "valor re loco",
            }));
        }catch(exception: any){
            error=true;
            assert.equal(exception.message, "JSON inválido al instanciar un Descuento.");
        }
        assert.equal(error, true);
    });

    it("Al recibir un JSON con campos faltantes para crear un descuento deberia lanzar un error", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        try{
            fabricaDescuentos.crearDescuento(JSON.stringify({
                "type": "PRODUCT_PERCENTAGE",
            }));
        }catch(exception: any){
            assert.equal(exception.message, "JSON inválido al instanciar un Descuento.");
            error=true;
        }
        assert.equal(error, true);

        error = false;
        try{
            fabricaDescuentos.crearDescuento(JSON.stringify({
                "value": "10",
            }));
        }catch(exception: any){
            assert.equal(exception.message, "JSON inválido al instanciar un Descuento.");
            error=true;
        }
        assert.equal(error, true);
    });

    it("Al recibir un descuento de tipo PRODUCT_PERCENTAGE con un valor válido devuelve un descuento de tipo porcentual", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        let descuentoPorcentual:Descuento = fabricaDescuentos.crearDescuento(
            JSON.stringify({
                "type": "PRODUCT_PERCENTAGE",
                "value": 10
            })
        );
        assert.equal(error, false);
        assert.equal(descuentoPorcentual instanceof DescuentoPorcentual, true);
        assert.equal(descuentoPorcentual instanceof Descuento, true);
        assert.equal(descuentoPorcentual instanceof DescuentoFijo, false);
        assert.equal(descuentoPorcentual instanceof DescuentoPorcentualCarrito, false);
    });

    it("Al recibir un descuento de tipo FIX con un valor válido devuelve un descuento de tipo fijo", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        let descuentoFijo:Descuento = fabricaDescuentos.crearDescuento(
            JSON.stringify({
                "type": "FIX",
                "value": 10
            })
        );
        assert.equal(error, false);
        assert.equal(descuentoFijo instanceof DescuentoFijo, true);
        assert.equal(descuentoFijo instanceof Descuento, true);
        assert.equal(descuentoFijo instanceof DescuentoPorcentual, false);
        assert.equal(descuentoFijo instanceof DescuentoPorcentualCarrito, false);
    });

    it("Al recibir un descuento de tipo CART_PERCENTAGE con un valor válido devuelve un descuento de tipo fijo", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        let descuentoPorcentualCarrito:Descuento = fabricaDescuentos.crearDescuento(
            JSON.stringify({
                "type": "CART_PERCENTAGE",
                "value": 10
            })
        );
        assert.equal(error, false);
        assert.equal(descuentoPorcentualCarrito instanceof DescuentoPorcentualCarrito, true);
        assert.equal(descuentoPorcentualCarrito instanceof Descuento, true);
        assert.equal(descuentoPorcentualCarrito instanceof DescuentoPorcentual, false);
        assert.equal(descuentoPorcentualCarrito instanceof DescuentoFijo, false);
    });


    it("Al recibir un descuento de tipo no conocido lanza error", ()=>{
        let fabricaDescuentos = new FabricaDeDescuentos();
        let error = false;
        try{
            let descuentoFijo:Descuento = fabricaDescuentos.crearDescuento(
                JSON.stringify({
                    "type": "UNKNOWN",
                    "value": 10
                })
            );
        }catch(exception:any){
            assert.equal(exception.message, 'El tipo de descuento no es valido.');
            error = true;
        }
        assert.equal(error, true);
    });
})
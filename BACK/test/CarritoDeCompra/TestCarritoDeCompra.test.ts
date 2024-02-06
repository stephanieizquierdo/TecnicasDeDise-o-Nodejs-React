import Producto from "../../src/entities/CarritoDeCompra/Aplicable/Producto";
import MetodoDePago from "../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Calendar from "../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import CarritoDeCompras from "../../src/entities/CarritoDeCompra/CarritoDeCompras";
import Oferta from "../../src/entities/Ofertas/Oferta";
import DescuentoFijo from "../../src/entities/Ofertas/Descuentos/DescuentoFijo";

let chai = require('chai');
var assert = chai.assert;


describe('Carrito De Compras', function(){

    it("Debería inicializarse bien al recibir un medio de pago y un dia de compra válido", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CRÉDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        assert.equal(carritoDeCompras.metodoDePago, mDePago);
        assert.equal(carritoDeCompras.calendario, calendar);
    });

    it("Deberia permitir agregar un producto valido luego de instanciarse", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].producto, productoParticular);
        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].cantidad, 1);
    });

    it("Deberia permitir agregar 2 veces un producto valido luego de instanciarse", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);

        let productoParticular2 = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular2);

        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular2.codigoProducto].producto, productoParticular2);
        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular2.codigoProducto].cantidad, 2);

        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].producto, productoParticular2);
        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].cantidad, 2);
    });

    it("Deberia permitirme agregar varios productos luego de instanciarse", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);

        let JSONProd2 = {
            "code": "code_prod23",
            "category": {
                "code": "code_cat23",
                "name": "name_cat23"
            },
            "brand": {
                "code": "code_brand23",
                "name": "name_brand23"
            },
            "name": "name_prod3",
            "price": 223,
            "iva_percentage": 10.56

        };
        let productoParticular2 = new Producto( JSON.stringify(JSONProd2) );
        carritoDeCompras.agregarProducto(productoParticular2);

        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].producto, productoParticular);
        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular.codigoProducto].cantidad, 1);

        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular2.codigoProducto].producto, productoParticular2);
        assert.equal(carritoDeCompras.obtenerProductos()[productoParticular2.codigoProducto].cantidad, 1);

    });
    it("Agrego  dos productos iguales al carrito entonces me aumenta la cantidad ", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );
        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(carritoDeCompras.getCantidadProducto("code_prod"), 2);
    });
    

    it("LLamar al metodo obtenerProductos me devuelve la lista de productos completa del carrito", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()), 
            "{}"
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()), 
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        let JSONProd2 = {
            "code": "code_prod23",
            "category": {
                "code": "code_cat23",
                "name": "name_cat23"
            },
            "brand": {
                "code": "code_brand23",
                "name": "name_brand23"
            },
            "name": "name_prod3",
            "price": 223,
            "iva_percentage": 10.56

        };
        let productoParticular2 = new Producto( JSON.stringify(JSONProd2) );
        carritoDeCompras.agregarProducto(productoParticular2);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()), 
            JSON.stringify({
                [productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1},
                [productoParticular2.codigoProducto]: {producto: productoParticular2, cantidad: 1}
            })
        );

    });

    it("Calcular el monto final de un carrito vacío me devuelve un monto de 0", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        assert.equal(
            carritoDeCompras.obtenerMontoFinal(), 
            0
        );

    });

    it("Calcular el monto final de un carrito con un producto me devuelve el monto final del producto", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            carritoDeCompras.obtenerMontoFinal(), 
            productoParticular.getPrecioFinal()
        );

    });

    it("Calcular el monto final de un carrito con un producto con descuentos me devuelve el monto final del producto", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        const oferta = new Oferta("desc_oferta", "cod_oferta", new DescuentoFijo(10));
        productoParticular.agregarOferta(oferta);
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            carritoDeCompras.obtenerMontoFinal(), 
            productoParticular.getPrecioFinal()
        );

    });

    it("Calcular el monto final de un carrito con 2 productos del mismo tipo me devuelve el monto final del producto x2", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );
        carritoDeCompras.agregarProducto(productoParticular);
        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            carritoDeCompras.obtenerMontoFinal(), 
            productoParticular.getPrecioFinal()*2
        );

    });

    it("Calcular el monto final de un carrito con 4 productos siendo 2 de cada tipo me devuelve el monto final de cada producto x2", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );

        let JSONProd2 = {
            "code": "code_prod2",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 223,
            "iva_percentage": 10.5

        };
        let productoParticular2 = new Producto( JSON.stringify(JSONProd2) );
        carritoDeCompras.agregarProducto(productoParticular);
        carritoDeCompras.agregarProducto(productoParticular);
        carritoDeCompras.agregarProducto(productoParticular2);
        carritoDeCompras.agregarProducto(productoParticular2);

        assert.equal(
            carritoDeCompras.obtenerMontoFinal(), 
            productoParticular.getPrecioFinal()*2 + productoParticular2.getPrecioFinal()*2
        );

    });

    it("Eliminar un producto no instanciado no afecta a la lista de productos", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        carritoDeCompras.eliminarProductoConId("UNEXISTENT");

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );
    });

    it("Eliminar un producto ya agregado al carrito lo elimina a el y todas sus existencias de la lista de productos", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 2}})
        );

        carritoDeCompras.eliminarProductoConId(productoParticular.codigoProducto);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({})
        );
    });

    it("Eliminar una unidad de un producto ya agregado al carrito lo elimina a el en una sola de sus existencias de la lista de productos", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 2}})
        );

        carritoDeCompras.eliminarUnidadProductoConId(productoParticular.codigoProducto);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );
    });

    it("Eliminar todas las unidades de un producto ya agregado al carrito lo elimina a el totalmente", function(){
        let mDePago = new MetodoDePago(JSON.stringify({
            "method": "TARJETA DE CREDITO",
            "entity": "BANCO GALICIA"
        }));
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));
        let carritoDeCompras = new CarritoDeCompras(
            mDePago, 
            calendar   
        );

        let JSONProd = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        };
        let productoParticular = new Producto( JSON.stringify(JSONProd) );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        carritoDeCompras.agregarProducto(productoParticular);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 2}})
        );

        carritoDeCompras.eliminarUnidadProductoConId(productoParticular.codigoProducto);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({[productoParticular.codigoProducto]: {producto: productoParticular, cantidad: 1}})
        );

        carritoDeCompras.eliminarUnidadProductoConId(productoParticular.codigoProducto);

        assert.equal(
            JSON.stringify(carritoDeCompras.obtenerProductos()),
            JSON.stringify({})
        );
    });
});
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto"
import DescuentoFijo from "../../../src/entities/Ofertas/Descuentos/DescuentoFijo"
import DescuentoPorcentual from "../../../src/entities/Ofertas/Descuentos/DescuentoPorcentual"
import Oferta from "../../../src/entities/Ofertas/Oferta"

let chai = require('chai');
var assert = chai.assert;

const CODIGO_PRODUCTO = "product.code"
const PORCENTAJE_IVA = "product.iva_percentage"
const CODIGO_CATEGORIA = "product.category.code"
const PRECIO_BASE = "product.price"
const NOMBRE = "product.name"
const CODIGO_MARCA = "product.brand.code"


describe('Producto', function(){
    it('Debería generar correctamente un producto', function(){

        let objetoInicial = {
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

        }
        const producto = new Producto( JSON.stringify(objetoInicial) );

        assert.equal(producto.codigoProducto,"code_prod");
        assert.equal(producto.categoriaProducto.code,"code_cat");
        assert.equal(producto.categoriaProducto.name,"name_cat");
        assert.equal(producto.marca.code,"code_brand");
        assert.equal(producto.marca.name,"name_brand");
        assert.equal(producto.nombre,"name_prod");
        assert.equal(producto.precioBase,22);
        assert.equal(producto.porcentajeIva,10.5);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin código producto", function(){
        let error = false;
        let objetoInicial = {
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

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin categoría", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "brand": {
                "code": "code_brand",
                "name": "name_brand"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin marca", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "name": "name_prod",
            "price": 22,
            "iva_percentage": 10.5

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin nombre", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "price": 22,
            "iva_percentage": 10.5

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin precio", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "name": "name_prod",
            "iva_percentage": 10.5

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial esté sin % de iva", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "name": "name_prod",
            "price": 10.5

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial tenga atributos de más", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "name": "name_prod",
            "price": 10.5,
            "iva_percentage": 10.5,
            "atr_extra": 23

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Debería tirar error en caso de que el JSON inicial tenga atributos de más y le falte un campo requerido", function(){
        let error = false;
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "name": "name_prod",
            "price": 10.5,
            "atr_extra": 23

        }
        try{
            const producto = new Producto( JSON.stringify(objetoInicial) );
        }catch(exception: any){
            error = true;
            assert.equal(exception.message, "JSON recibido inválido. No se puede construir el producto.");
        }
        assert.equal(true, error);
    });

    it("Un producto sin ofertas debería tener como precio final su precio base mas su iva", function(){
        let objetoInicial = {
            "code": "code_prod",
            "category": {
                "code": "code_cat",
                "name": "name_cat"
            },
            "brand":{"code": "code_brand", "name": "name_brand"},
            "name": "name_prod",
            "price": 100,
            "iva_percentage": 21

        }
        const producto = new Producto( JSON.stringify(objetoInicial) );
        assert.equal(producto.getPrecioFinal(), objetoInicial.price+objetoInicial.price*objetoInicial.iva_percentage/100);
    });

    it(
        "Un producto con ofertas de dto fijo debería tener como precio final su precio base mas su iva menos su descuento fijo", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21

            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            const oferta = new Oferta("desc_oferta", "cod_oferta", new DescuentoFijo(10));
            producto.agregarOferta(oferta);
            assert.equal(
                producto.getPrecioFinal(), 
                objetoInicial.price+objetoInicial.price*objetoInicial.iva_percentage/100 - 10
            );
        }
    );

    it(
        "Un producto con ofertas de descuento % debería tener como precio final su precio base mas su iva menos su descuento %", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            const oferta = new Oferta("desc_oferta", "cod_oferta", new DescuentoPorcentual(10));
            producto.agregarOferta(oferta);
            assert.equal(
                producto.getPrecioFinal(), 
                objetoInicial.price+objetoInicial.price*objetoInicial.iva_percentage/100 - objetoInicial.price*0.1
            );
        }
    );

    it(
        "Obtener su atributo CODIGO_PRODUCTO nos devuelve el código del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(CODIGO_PRODUCTO), 
                "code_prod"
            );
        }
    );

    it(
        "Obtener su atributo PORCENTAJE_IVA nos devuelve el % de iva del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(PORCENTAJE_IVA), 
                21
            );
        }
    );

    it(
        "Obtener su atributo CODIGO_CATEGORIA nos devuelve el código de categoría del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(CODIGO_CATEGORIA), 
                "code_cat"
            );
        }
    );

    it(
        "Obtener su atributo PRECIO_BASE nos devuelve el precio base del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(PRECIO_BASE), 
                100
            );
        }
    );

    it(
        "Obtener su atributo NOMBRE nos devuelve el nombre del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(NOMBRE), 
                "name_prod"
            );
        }
    );

    it(
        "Obtener su atributo CODIGO_MARCA nos devuelve el código de la marca del producto", 
        function(){
            let objetoInicial = {
                "code": "code_prod",
                "category": {
                    "code": "code_cat",
                    "name": "name_cat"
                },
                "brand":{
                    "code": "code_brand", 
                    "name": "name_brand"
                },
                "name": "name_prod",
                "price": 100,
                "iva_percentage": 21
            }
            const producto = new Producto( JSON.stringify(objetoInicial) );
            assert.equal(
                producto.getAttribute(CODIGO_MARCA), 
                "code_brand"
            );
        }
    );
})
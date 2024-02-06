import Calendar from "./Aplicable/Calendar";
import MetodoDePago from "./Aplicable/MetodoDePago";
import Producto from "./Aplicable/Producto";
import Oferta from '../Ofertas/Oferta';
import Descuento from '../Ofertas/Descuentos/Descuento';
import MotorDeReglas from '../MotorDeReglas/MotorDeReglas';

interface ProdParticular {
    producto : Producto,
    cantidad : number,
};

interface Marca {
    code : string,
    name : string,
}

interface Categoria {
    code : string,
    name : string,
}

export interface Discount {
	type: "PRODUCT_PERCENTAGE" | "CART_PERCENTAGE" | "FIX";
	value: number;
}

interface Product {
	name: string;
	brand: {
		code: string;
		name: string;
	};
	category: {
		code: string;
		name: string;
	};
	price: number;
	iva_percentage: number;
	code: string;
}

interface ProcessedProduct {
	product: Product;
	discounts: Discount[];
}

export default class CarritoDeCompras {
    
    productos: {[idProducto: string]: ProdParticular};
    metodoDePago: MetodoDePago;
    calendario: Calendar;

    constructor(metodoDePago: MetodoDePago, diaDeCompra: Calendar){    
        this.productos = {};
        this.metodoDePago = metodoDePago;
        this.calendario = diaDeCompra;
    }

    agregarProducto(producto: Producto){
        let motorDeReglas = new MotorDeReglas();
        motorDeReglas.agregarOfertasAProducto(
            producto,
            this.calendario,
            this.metodoDePago
        );
        let codigoProducto = producto.getCodigoProducto();
        if(this.productos[codigoProducto] != null){
            this.productos[codigoProducto].producto = producto;
            this.productos[codigoProducto].cantidad += 1;
        }
        else{
            this.productos[codigoProducto] = {producto: producto, cantidad:1};
        }
    }
    
    obtenerProductos(){
        return this.productos
    }

    getProductsList(){
        let productos: any = Object.values(this.productos);
        let prodList: Producto[] = [];
        productos.forEach(function(productoParticular: ProdParticular){
            prodList.push(productoParticular.producto);
        })
        return prodList;
    }

    obtenerMontoFinal(): number{
        let total = 0;
        for (let key in this.productos){
            total += this.productos[key].producto.getPrecioFinal() * this.productos[key].cantidad;
        }
        return total;
    }

    eliminarProductoConId(codigoProducto: string){
        delete this.productos[codigoProducto];
    }

    eliminarUnidadProductoConId(codigoProducto: string){
        if (this.productos[codigoProducto] != null && this.productos[codigoProducto].cantidad <= 1){
            delete this.productos[codigoProducto];
        }else if(this.productos[codigoProducto] != null && this.productos[codigoProducto].cantidad > 1){
            this.productos[codigoProducto].cantidad -= 1;
        }
    }

    obtenerCalendario(): Calendar{
        return this.calendario;
    }

    obtenerMetodoDePago(): MetodoDePago{
        return this.metodoDePago;
    }

    getCantidadProducto(codigoProducto: any): number{
        if(this.productos[codigoProducto] != null){
            return this.productos[codigoProducto].cantidad;
        }
        return 0;
    }

    procesarCarrito(): ProcessedProduct[]{
        let productos: Producto[] = this.getProductsList();
        let response:ProcessedProduct[] = [];
        let carrito: CarritoDeCompras = this;
        productos.forEach(function(producto: Producto){
            for(let i=0; i < (carrito.getCantidadProducto(producto.getCodigoProducto())); i++){
                let ofertas: Oferta[] = producto.getOfertas();
                let descuentos: Discount[] = [];
                ofertas.forEach(function(oferta: Oferta){
                    let descuento: Descuento = oferta.getDescuento();
                    descuentos.push(descuento.getAsJSON());
                });
                if(ofertas.length > 0){
                    response.push({"discounts": descuentos, "product": producto.getAsJSON()});
                }
            }
        });
        return response;
    }
}
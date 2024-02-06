import Producto from '../entities/CarritoDeCompra/Aplicable/Producto';
import {Discount} from '../entities/CarritoDeCompra/CarritoDeCompras';
import Descuento from '../entities/Ofertas/Descuentos/Descuento';
import Oferta from '../entities/Ofertas/Oferta';
import Calendar from '../entities/CarritoDeCompra/Aplicable/Calendar';
import MetodoDePago from '../entities/CarritoDeCompra/Aplicable/MetodoDePago';
import CarritoDeCompras from '../entities/CarritoDeCompra/CarritoDeCompras';
import MotorDeReglas from '../entities/MotorDeReglas/MotorDeReglas';
let carritosDeCompras:any = new Map();
let response:{
    data: {},
    message: string,
};





export function getCartProducts(jwt:string | string[]): {}{
    if(jwt != null){
        let carrito:CarritoDeCompras = carritosDeCompras.get(jwt);
        response = {
            data: {},
            message: 'OK'
        };
        response.data = carrito.obtenerProductos();
        return response;
    }
    return {};
}

export function crearCarrito(req: any): {}{
    if(req.headers.jwt != null && (carritosDeCompras.get(req.headers.jwt) == null || carritosDeCompras.get(req.headers.jwt) == undefined)){
        response = {
            data: {},
            message: 'OK'
        };
        let metodoDePago = new MetodoDePago(JSON.stringify(req.body.data.payment));
        let calendar = new Calendar(JSON.stringify(req.body.data.purchase_date));
        carritosDeCompras.set(req.headers.jwt, new CarritoDeCompras(metodoDePago, calendar));
        response.message = "Carrito creado con éxito."
        return response;
    }else{
        throw new Error("El carrito con el token de la petición ya ha sido instanciado previamente.");
    }
}

export function agregarProductoACarrito(req: any): {}{
    if(req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        let carritoDeCompras = carritosDeCompras.get(req.headers.jwt);
        let producto = new Producto(JSON.stringify(req.body.data.product));
        carritoDeCompras.agregarProducto(producto);
        response.data = carritoDeCompras.obtenerProductos();
        response.message = "El producto ha sido agregado con éxito.";
        return response;
    }else{
        throw new Error("El carrito con el token de la petición no ha sido instanciado aún.");
    }
}

export function eliminarUnidadDeProducto(req: any): {}{
    if(req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        let carritoDeCompras = carritosDeCompras.get(req.headers.jwt);
        carritoDeCompras.eliminarUnidadProductoConId(req.body.data.product.code);
        response.data = carritoDeCompras.obtenerProductos();
        response.message = "El producto ha sido reducido en una unidad con éxito.";
        return response;
    }else{
        throw new Error("El carrito con el token de la petición no ha sido instanciado aún.");
    }
}

export function eliminarProducto(req: any): {}{
    if(req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        let carritoDeCompras = carritosDeCompras.get(req.headers.jwt);
        carritoDeCompras.eliminarProductoConId(req.body.data.product.code);
        response.data = carritoDeCompras.obtenerProductos();
        response.message = "El producto ha sido eliminado en su totalidad con éxito.";
        return response;
    }else{
        throw new Error("El carrito con el token de la petición no ha sido instanciado aún.");
    }
}

export function procesarCarrito(req: any): any{
    if(req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        let carritoDeCompras = carritosDeCompras.get(req.headers.jwt);
        let response = carritoDeCompras.procesarCarrito();
        return response;
    }
    else{
        throw new Error("El carrito no se encuentra instanciado para el JWT dado.");
    }

}

export function deleteCarrito(req: any): any{
    if(req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        carritosDeCompras.set(req.headers.jwt, null);
        response.message = "Carrito borrado exitosamente.";
        response.data = {};
    }
    else{
        throw new Error("El carrito no existe.");
    }
    return response;
}

export function devolverProductosConPrecioFinal(req: any): any {
    if (req.headers.jwt != null && carritosDeCompras.get(req.headers.jwt) != null){
        
        let carritoDeCompras = carritosDeCompras.get(req.headers.jwt);
        let productos: Producto[] = carritoDeCompras.getProductsList();
        let responseArray: any[] = [];
        productos.forEach((producto: Producto) => {
            let responseItem: {
                "name": string, 
                "discounts": Discount[], 
                "final_price": string, 
                "quantity": number,
                "offers_desc": string[]
            } = {
                "name": null, 
                "discounts": [], 
                "final_price": '0.00', 
                "quantity":0,
                "offers_desc": []
            };
            responseItem['name'] = producto.getAttribute("product.name");
            let descuentos: Discount[] = [];
            producto.getOfertas().forEach(function(oferta: Oferta){
                let descuento: Descuento = oferta.getDescuento();
                descuentos.push(descuento.getAsJSON());
                responseItem['offers_desc'].push(oferta.getDescripcion());
            });
            responseItem['discounts'] = descuentos;
            responseItem['final_price'] = producto.getPrecioFinal().toFixed(2);
            responseItem['quantity'] = carritoDeCompras.getCantidadProducto(producto.getAttribute("product.code"));
            responseArray.push(responseItem);
        })
        response.data = {"products": responseArray};
        response.message = "Monto final de compras";
        return response;
    } else {
        throw new Error("El carrito no ha sido instanciado aun para el JWT dado")
    }
    
}
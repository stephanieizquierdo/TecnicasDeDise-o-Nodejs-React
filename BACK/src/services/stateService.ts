import { Estado , SingletonEstado } from '../entities/CarritoDeCompra/Estado/Estado';
import Producto from '../entities/CarritoDeCompra/Aplicable/Producto';
import Oferta from '../entities/Ofertas/Oferta';
import {Regla} from '../entities/Ofertas/Reglas/Regla';

export function getProducts(): {}[]{
    let estado:Estado = SingletonEstado.getInstance();
    let productos = estado.getProductos();
    let respuesta: {}[] = [];
    productos.forEach(function(producto:Producto){
        respuesta.push(producto);
    }); 
    return respuesta;
}

export function getOfertas(): {}[]{
    let estado:Estado = SingletonEstado.getInstance();
    let ofertas: Oferta[] = estado.getOfertas();
    let respuesta: {}[] = [];
    ofertas.forEach(function(oferta:Oferta){
        respuesta.push(oferta);
    }); 
    return respuesta;
}

export function getReglas(): {}[]{
    let estado:Estado = SingletonEstado.getInstance();
    let reglas: Regla[] = estado.getReglas();
    let respuesta: {}[] = [];
    reglas.forEach(function(regla:Regla){
        respuesta.push(regla);
    }); 
    return respuesta;
}
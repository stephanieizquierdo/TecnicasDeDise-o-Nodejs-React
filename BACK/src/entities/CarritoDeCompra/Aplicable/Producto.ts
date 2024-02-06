import Oferta from '../../Ofertas/Oferta';
import {Aplicable} from './Aplicable'
const CODIGO_PRODUCTO = "product.code"
const PORCENTAJE_IVA = "product.iva_percentage"
const CODIGO_CATEGORIA = "product.category.code"
const PRECIO_BASE = "product.price"
const NOMBRE = "product.name"
const CODIGO_MARCA = "product.brand.code"

interface Marca {
    code : string,
    name : string,
}

interface Categoria {
    code : string,
    name : string,
}

interface ProductoJSON{
    name: string,
    brand: Marca,
    category: Categoria,
    price: number,
    iva_percentage: number,
    code: any
};

export default class Producto implements Aplicable{

    private codigoProducto: string;
    private categoriaProducto: Categoria;
    private porcentajeIva: number;
    private precioBase: number;
    private nombre: string;
    private marca: Marca;
    private ofertas: Oferta[];

    private JSONEsValido(objetoProducto: {"name": string,"brand": Marca, "category": Categoria, "price": number, "iva_percentage": number,"code": string }): boolean{
        if(!objetoProducto.code || !objetoProducto.category || !objetoProducto.iva_percentage || 
            !objetoProducto.price || !objetoProducto.name || !objetoProducto.brand){          
                return false;
        }
        if(Object.keys(objetoProducto).length > 6){
            return false;
        }
        return true;
    }

    constructor(JSONProducto: string){
        let objetoProducto = JSON.parse(JSONProducto);

        if(this.JSONEsValido(objetoProducto)){
            this.codigoProducto = objetoProducto.code;
            this.categoriaProducto = objetoProducto.category;
            this.porcentajeIva = objetoProducto.iva_percentage;
            this.precioBase = objetoProducto.price;
            this.nombre = objetoProducto.name;
            this.marca = objetoProducto.brand;
            this.ofertas = [];
        }
        else{
            throw new Error("JSON recibido inválido. No se puede construir el producto.");
        }
    }      
    
    agregarOferta(ofertaAAgregar:Oferta): void{
        this.ofertas.push(ofertaAAgregar);
    }

    getPrecioFinal(): number{
        let precioFinal: number = this.precioBase + this.precioBase*this.porcentajeIva/100;
        for (let i = 0; i < this.ofertas.length; i++){
            precioFinal -= this.ofertas[i].aplicarDescuento(this.precioBase);
        }
        return precioFinal;
    }

    getCodigoProducto(): string{
        return this.codigoProducto;
    }

    getAttribute(attribute:string): any{
        if (attribute.toLowerCase() === CODIGO_PRODUCTO){
            return this.codigoProducto;
        }else if (attribute.toLowerCase() === PORCENTAJE_IVA){
            return this.porcentajeIva;
        }else if (attribute.toLowerCase() === CODIGO_CATEGORIA){
            return this.categoriaProducto.code;
        }else if (attribute.toLowerCase() === PRECIO_BASE){
            return this.precioBase;
        }else if (attribute.toLowerCase() === NOMBRE){
            return this.nombre;
        }else if (attribute.toLowerCase() === CODIGO_MARCA){
            return this.marca.code;
        }
        throw new Error("El atributo solicitado no existe en el producto.");

    }

    getOfertas(): Oferta[]{
        return this.ofertas;
    }

    getAsJSON(): ProductoJSON{
        let response:ProductoJSON = {
            name: null,
            code: null,
            brand: null,
            category: null,
            price: null,
            iva_percentage: null
        };
        response.name = this.nombre;
        response.code = this.codigoProducto;
        response.brand = this.marca;
        response.category = this.categoriaProducto;
        response.price = this.precioBase;
        response.iva_percentage = this.porcentajeIva;

        return response;
    }
    

}
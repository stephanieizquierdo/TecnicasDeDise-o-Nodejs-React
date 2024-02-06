import Descuento from './Descuentos/Descuento';

import {Regla} from './Reglas/Regla'
import Producto from '../CarritoDeCompra/Aplicable/Producto'
import Calendar from '../CarritoDeCompra/Aplicable/Calendar'
import MetodoDePago from '../CarritoDeCompra/Aplicable/MetodoDePago'

export default class Oferta{
    
    private codigoOferta: any;
    private descripcion: string;
    private descuento: Descuento;
    private regla: Regla;
    
    constructor(descripcionOferta: string, codigoOferta: any, descuento: Descuento){
        this.descripcion = descripcionOferta;
        this.codigoOferta = codigoOferta;
        this.descuento = descuento;
    }

    addRegla(regla: Regla){
        this.regla = regla;
    }
   
    aplicarDescuento(valorBase: number): number{
        return this.descuento.getValorDescuento(valorBase);
    }

    cumpleReglas(producto:Producto,calendario: Calendar,metodoDePago: MetodoDePago): boolean{
        return this.regla.verificarRegla(producto,calendario,metodoDePago);
    }

    getDescuento(): Descuento{
        return this.descuento;
    }

    getDescripcion(): string{
        return this.descripcion;
    }

}
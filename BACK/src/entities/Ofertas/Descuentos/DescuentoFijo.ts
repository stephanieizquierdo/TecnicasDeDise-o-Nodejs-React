import { Discount } from '../../CarritoDeCompra/CarritoDeCompras';
import Descuento from './Descuento';

export default class DescuentoFijo extends Descuento {

    constructor(valor: number){
        super(valor);
    }
    getValorDescuento(valorBase: number): number{
        return this.valor;
    }
    getAsJSON(): Discount{
        return {"type":"FIX", "value": this.valor};
    }
}
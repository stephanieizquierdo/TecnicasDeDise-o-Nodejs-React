import { Discount } from '../../CarritoDeCompra/CarritoDeCompras';
import Descuento from './Descuento';

export default class DescuentoPorcentualCarrito extends Descuento {

    constructor(valor: number){
        if(valor > 100){
            throw new Error("El porcentaje del descuento porcentual no puede ser mayor a 100%");
        }
        super(valor);
    }
    getValorDescuento(valorBase: number){
        return valorBase*this.valor/100
    }
    getAsJSON(): Discount{
        return {"type":"CART_PERCENTAGE", "value": this.valor};
    }
}
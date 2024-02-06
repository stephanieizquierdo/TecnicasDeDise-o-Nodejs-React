import { Discount } from "../../CarritoDeCompra/CarritoDeCompras";

export default abstract class Descuento{
    
    protected valor: number;

    constructor(valorDescuento: number){
        if(valorDescuento <= 0){
            throw new Error("El Valor "+valorDescuento+" es invalido para instanciar el descuento.");
        }
        this.valor = valorDescuento;
    }

    abstract getAsJSON(): Discount;
    abstract getValorDescuento(valorBase: number): number;
}
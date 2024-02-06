import { Aplicable } from '../../../CarritoDeCompra/Aplicable/Aplicable';
import Condicion from './Condicion';

export default class CondicionDistinct extends Condicion {
    constructor(valor: any, campo: string){
        super(valor, campo);
    }
    verificarCondicion(aplicable: Aplicable): boolean{
        try{
            return aplicable.getAttribute(this.campo) != this.valor;
        }catch(e){
            return false;
        }

    }
}
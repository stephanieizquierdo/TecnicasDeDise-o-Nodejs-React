import { Aplicable } from '../../../CarritoDeCompra/Aplicable/Aplicable';
import Condicion from './Condicion';

export default class CondicionEquals extends Condicion {

    constructor(valor: any, campo: string){
        super(valor, campo)
    }
    verificarCondicion(aplicable: Aplicable): boolean{
        try{
            if(typeof(aplicable.getAttribute(this.campo)) == 'string'){
                return aplicable.getAttribute(this.campo).toLowerCase() == this.valor.toLowerCase();
            }
            else{
                return aplicable.getAttribute(this.campo) == this.valor;
        }
        }catch(e){
            return false;
        }
    }
}
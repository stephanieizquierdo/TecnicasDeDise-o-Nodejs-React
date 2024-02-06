import { Aplicable } from '../../../CarritoDeCompra/Aplicable/Aplicable';
import Condicion from './Condicion';

export default class CondicionIn extends Condicion {

    constructor(valor: any, campo: string){
        super(valor, campo)
    }
    verificarCondicion(aplicable: Aplicable): boolean {
        try{
            return this.valor.includes(aplicable.getAttribute(this.campo))

        }catch(e){
            return false;
        }
    }
}
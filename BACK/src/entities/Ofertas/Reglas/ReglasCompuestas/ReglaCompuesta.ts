import {Regla} from '../Regla'
import Calendar from '../../../CarritoDeCompra/Aplicable/Calendar';
import MetodoDePago from '../../../CarritoDeCompra/Aplicable/MetodoDePago';
import Producto from '../../../CarritoDeCompra/Aplicable/Producto';
import FuncionLogica from './FuncionLogica';

//composite class (composite)
export default class ReglaCompuesta implements Regla{
    protected reglas: Regla[]
    protected funcionLogica : FuncionLogica;
    protected codigo; 

    constructor(codigo: string, reglas: Regla[], funcionLogica : FuncionLogica){
        this.codigo = codigo;
        this.reglas = reglas;
        this.funcionLogica = funcionLogica; 
    }

    verificarRegla(producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago): boolean{
        return this.funcionLogica.verificarCon(this.reglas,producto,calendar,metodoDePago);
    }

    getCodigo(): string {
        return this.codigo;
    }
}
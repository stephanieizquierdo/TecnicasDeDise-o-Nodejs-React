import Calendar from '../../../CarritoDeCompra/Aplicable/Calendar';
import MetodoDePago from '../../../CarritoDeCompra/Aplicable/MetodoDePago';
import Producto from '../../../CarritoDeCompra/Aplicable/Producto';
import {Regla} from '../Regla'
import Condicion from './Condicion';

//leaf class (composite)
export default class ReglaUnitaria implements Regla{

    protected descripcion: string;
    protected codigo: string;
    protected condicion: Condicion;

    constructor(codigo: string, descripcion: string,condicion: Condicion){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.condicion = condicion;
    }
    verificarRegla(producto: Producto, calendario: Calendar, metodoDePago: MetodoDePago): boolean{
        let condicionProducto = this.condicion.verificarCondicion(producto);
        let condicionCalendario = this.condicion.verificarCondicion(calendario);
        let condicionMetodoDePago = this.condicion.verificarCondicion(metodoDePago);
        return (condicionProducto || condicionCalendario || condicionMetodoDePago);
    }

    getCodigo(): string {
        return this.codigo;
    }
}
import { Regla } from "../Regla";
import Producto from "../../../CarritoDeCompra/Aplicable/Producto";
import Calendar from "../../../CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../CarritoDeCompra/Aplicable/MetodoDePago";

export default abstract class FuncionLogica{

    abstract verificarCon(reglas : Regla[],producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago):boolean;

}
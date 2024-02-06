import {Regla} from "../Regla";
import FuncionLogica from "./FuncionLogica";
import Producto from "../../../CarritoDeCompra/Aplicable/Producto";
import Calendar from "../../../CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../CarritoDeCompra/Aplicable/MetodoDePago";

export default class FuncionLogicaAnd extends FuncionLogica {

    verificarCon(reglas : Regla[],producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago): boolean{
        let cumple = true;
        reglas.forEach((regla : Regla) =>{
            if (!regla.verificarRegla(producto,calendar,metodoDePago)){
                cumple = false;
            }
         } ); 
        return cumple;
    }
}
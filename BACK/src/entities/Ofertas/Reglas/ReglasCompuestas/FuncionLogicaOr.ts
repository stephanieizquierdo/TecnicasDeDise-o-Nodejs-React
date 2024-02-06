import { Regla } from "../Regla";
import FuncionLogica from "./FuncionLogica";
import Calendar from "../../../CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../CarritoDeCompra/Aplicable/Producto";

export default class FuncionLogicaOr extends FuncionLogica {

    verificarCon(reglas: Regla[], producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago): boolean {
        
        let cumple = false;

        reglas.forEach((regla : Regla) => {
            if (regla.verificarRegla(producto,calendar,metodoDePago)){
                cumple = true;
            }
        });
        return cumple;
    }
}
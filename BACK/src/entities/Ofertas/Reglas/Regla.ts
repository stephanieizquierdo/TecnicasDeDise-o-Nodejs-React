import MetodoDePago from "../../CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../CarritoDeCompra/Aplicable/Producto";
import Calendar from "../../CarritoDeCompra/Aplicable/Calendar";

//component interface (composite)
export interface Regla {

    verificarRegla(producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago): boolean; 
    getCodigo(): string;
}

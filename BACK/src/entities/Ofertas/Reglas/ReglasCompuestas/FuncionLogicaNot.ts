import {Regla} from "../Regla";
import FuncionLogica from "./FuncionLogica";
import Producto from "../../../CarritoDeCompra/Aplicable/Producto";
import Calendar from "../../../CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../CarritoDeCompra/Aplicable/MetodoDePago";

export default class FuncionLogicaNot extends FuncionLogica {

    verificarCon(reglas: Regla[], producto: Producto, calendar: Calendar, metodoDePago: MetodoDePago): boolean {
        if(reglas.length > 0){
            return !reglas[0].verificarRegla(producto,calendar,metodoDePago); 
        } else{
            throw new Error("No existe regla que validar.");
        }
    }
/*
    private verificarNoExistenciaDeRegla(){
        if (this.reglas.length > 0 || this.reglas.length > 0){
            throw new Error("Ya existe una regla asociada a la Regla Compuesta NOT en cuestión.")
        }
    }

    agregarReglasSimples(reglas: ReglaUnitaria[]){
        if(reglas.length > 1 || reglas.length <= 0){
            throw new Error("No se pueden definir reglas vacías o que sean más de una regla para un NOT.");
        }
        this.verificarNoExistenciaDeRegla();
        this.reglas = reglas;
    }

    agregarReglasCompuestas(reglasCompuestas: ReglaCompuesta[]){
        if(reglasCompuestas.length > 1 || reglasCompuestas.length <= 0){
            throw new Error("No se pueden definir reglas vacías o que sean más de una regla para un NOT.");
        }
        this.verificarNoExistenciaDeRegla();
        this.reglas = reglasCompuestas;
    }*/
}
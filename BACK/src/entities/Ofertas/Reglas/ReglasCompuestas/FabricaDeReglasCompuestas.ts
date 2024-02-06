import {Regla} from '../Regla';
import FabricaDeReglas from '../FabricaDeReglas';
import FuncionLogicaOr from './FuncionLogicaOr';
import FuncionLogicaAnd from './FuncionLogicaAnd';
import FuncionLogicaNot from './FuncionLogicaNot';
import ReglaCompuesta from './ReglaCompuesta';
import {Estado} from '../../../CarritoDeCompra/Estado/Estado';

var validator = require("jsonschema").Validator;

export default class FabricaDeReglasCompuestas{

    constructor(){}
    
    generarSubReglas(JSONReglasHijo:any, estado: Estado): Regla[]{
        let fabricaDeReglas = new FabricaDeReglas();
        let reglas: Regla[] = [];
        if(typeof(JSONReglasHijo) == 'string'){ //Es un único código referencial
            let regla = estado.obtenerRegla(JSONReglasHijo);
            reglas.push(regla);
            return reglas;
        }
        JSONReglasHijo.forEach( (element:any) => {
            try{
                // El parse no tira error unicamente si es un JSON
                reglas.push(fabricaDeReglas.crearRegla(JSON.stringify(element), estado));
            }catch(e){
                // Se trata del array de codigos referenciales
                if (estado.existeRegla(element)){
                    let regla = estado.obtenerRegla(element);
                    reglas.push(regla);
                } else {
                    throw new Error("La regla " + element + " no se encuentra presente en el estado del sistema.");
                }
            }
        });
        return reglas;
    }

    generarReglaCompuesta(JSONRegla: any, estado: Estado): Regla{

        let funcionLogica;

        let 
            tipo: string = JSONRegla.type, 
            codigo : any = JSONRegla.code, 
            JSONReglasHijo : any = JSONRegla.rules;

        let reglas = this.generarSubReglas(JSONReglasHijo, estado);
        
        if (tipo == "AND"){
            funcionLogica = new FuncionLogicaAnd();
        } else if (tipo == "OR"){
            funcionLogica = new FuncionLogicaOr();
        } else if (tipo == "NOT"){
            funcionLogica = new FuncionLogicaNot();
        } else {
            throw new Error("Tipo de regla compuesta no reconocida");
        }
        let regla = new ReglaCompuesta(codigo, reglas, funcionLogica);
        return regla;
    }
}
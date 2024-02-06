import ReglaUnitaria from './ReglaUnitaria';
import CondicionEquals from './CondicionEquals';
import CondicionHigher from './CondicionHigher';
import CondicionLower from './CondicionLower';
import CondicionIn from './CondicionIn';
import CondicionDistinct from './CondicionDistinct';
import {Estado} from '../../../CarritoDeCompra/Estado/Estado';

const EQUALS = "EQUALS"
const HIGHER = "HIGHER"
const LOWER = "LOWER"
const IN = "IN"
const DISTINCT = "DISTINCT"

var Validator = require("jsonschema").Validator;

export default class FabricaDeReglasUnitarias{

    jsonValidSchema: {};

    constructor(){
        this.jsonValidSchema = {
            "type": "object",
            "properties": {
                "code": {"type": 'string'}, 
                "description": {"type":'string'}, 
                "type": {"type": 'string'},
                "field": {"type":'string'},
		        "value" : {"type":'any'},
            },
            "required": ["type", "description", "field", "value"],
        };
    }		

    crearRegla(JSONRegla:string, estado: Estado): ReglaUnitaria{
        let validator = new Validator();
        let objetoRegla = JSON.parse(JSONRegla);
        if(!validator.validate(objetoRegla, this.jsonValidSchema).valid){
            throw new Error("JSON inválido al instanciar una Regla.");
        }

        let codigo, tipo, descripcion, valor, campo;

        codigo = objetoRegla.code;
        descripcion = objetoRegla.description;
        tipo = objetoRegla.type;
        valor = objetoRegla.value;
        campo = objetoRegla.field;
        
        let condicion; 
        if (tipo === EQUALS){
            condicion = new CondicionEquals(valor,campo);
        }else if (tipo === HIGHER){
            condicion = new CondicionHigher(valor,campo);
        }else if (tipo === LOWER){
            condicion = new CondicionLower(valor,campo);
        }else if (tipo === IN){
            condicion = new CondicionIn(valor,campo);
        }else if (tipo === DISTINCT){
            condicion = new CondicionDistinct(valor,campo);
        }else{
            throw new Error("La regla recibida no es valida.");
        }
        
        let regla = new ReglaUnitaria(codigo, descripcion, condicion);
        return regla;
    }   
}
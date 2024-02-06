import { Aplicable } from "./Aplicable";

const METODO = "payment.method"
const ENTIDAD = "payment.entity"

var Validator = require("jsonschema").Validator;

export default class MetodoDePago implements Aplicable {

    private jsonValidSchema: {};
    private metodo: string;
    private entidad: string;

    constructor(JSONmetodoDePago: string){
        this.jsonValidSchema = {
            "type": "object",
            "properties": {
                "method": {"type": 'string'},
                "entity": {"type": 'string'}, 
            },
            "required": ["method", "entity"],
        };
        let validator = new Validator();
        let objetoMetodoDePago = JSON.parse(JSONmetodoDePago);

        if(!validator.validate(objetoMetodoDePago, this.jsonValidSchema).valid){
            throw new Error("JSON inválido al instanciar Método de Pago.");
        }

        this.metodo = objetoMetodoDePago.method;
        this.entidad = objetoMetodoDePago.entity;
    }
    getAttribute(attribute:string): any{
        if (attribute.toLowerCase() == METODO){
            return this.metodo;
        } else if (attribute.toLowerCase() == ENTIDAD){
            return this.entidad
        }else{
            throw new Error("El atributo solicitado no existe en el metodo de pago.");
        }

    }    
}
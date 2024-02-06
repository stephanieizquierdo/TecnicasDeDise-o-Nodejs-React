
import Descuento from "./Descuento";
import DescuentoFijo from "./DescuentoFijo";
import DescuentoPorcentual from "./DescuentoPorcentual";
import DescuentoPorcentualCarrito from "./DescuentoPorcentualCarrito";

var Validator = require("jsonschema").Validator;

export default class FabricaDeDescuentos{
    jsonValidSchema: {};

    constructor(){
        this.jsonValidSchema = {
            "type": "object",
            "properties": {
                "type": {"type": 'string'},
                "value": {"type": 'number'}, 
            },
            "required": ["type", "value"],
        };
    }

    crearDescuento(JSONdescuentos: string): Descuento{

        let validator = new Validator();
        let objetoDescuento = JSON.parse(JSONdescuentos);
        if(!validator.validate(objetoDescuento, this.jsonValidSchema).valid){
            throw new Error("JSON inválido al instanciar un Descuento.");
        }

        if (objetoDescuento.type == 'PRODUCT_PERCENTAGE'){
            return new DescuentoPorcentual(objetoDescuento.value);
        } else if (objetoDescuento.type == 'FIX'){
            return new DescuentoFijo(objetoDescuento.value);
        } else if (objetoDescuento.type == 'CART_PERCENTAGE'){
            return new DescuentoPorcentualCarrito(objetoDescuento.value);
        }else{
            throw new Error('El tipo de descuento no es valido.');   
        }
    }
}
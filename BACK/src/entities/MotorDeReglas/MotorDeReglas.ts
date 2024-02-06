import {Estado, SingletonEstado} from '../CarritoDeCompra/Estado/Estado';
import FabricaDeDescuentos from '../Ofertas/Descuentos/FabricaDeDescuentos';
import Oferta from '../Ofertas/Oferta'
import FabricaDeReglas from '../Ofertas/Reglas/FabricaDeReglas';
import Producto from '../CarritoDeCompra/Aplicable/Producto'
import Calendar from '../CarritoDeCompra/Aplicable/Calendar';
import MetodoDePago from '../CarritoDeCompra/Aplicable/MetodoDePago';

var Validator = require("jsonschema").Validator;

export default class MotorDeReglas{

    private ofertas: Oferta[];
    private jsonValidSchema: {};
    private estado: Estado;
    

    constructor(){

        this.jsonValidSchema = {
            "type": "object",
            "properties": {
                "description": {"type": 'string'},
                "code": {"type":'string'},
                "rule": {"type":'unknown'}
            },
            "discount":{
                "type": {"type":'string'},
                "value": {"type": 'number'}
            },
        };
        
        this.ofertas = [];
        this.estado = SingletonEstado.getInstance();
    }

    generarOfertas(JSONoferta: string){
        let validator = new Validator();
        
        let objetoOfertas = JSON.parse(JSONoferta);
        let fabricaDeReglas = new FabricaDeReglas();
        let fabricaDeDescuentos = new FabricaDeDescuentos();
        
        objetoOfertas.forEach( (item : any) =>{ 
            if(!validator.validate(item, this.jsonValidSchema).valid){
                throw new Error("JSON recibido inválido. No se puede construir las ofertas.");
            }
            let regla = null;
            try{
                regla = fabricaDeReglas.crearRegla(JSON.stringify(item.rule), this.estado);    
            }catch(e){
                regla = this.estado.obtenerRegla(item.rule);
            }
            let oferta = new Oferta(item.description, item.code, fabricaDeDescuentos.crearDescuento(JSON.stringify(item.discount)));
            oferta.addRegla(regla);
            this.estado.aniadirOferta(item.code, oferta);
        });
    }
    
    agregarOfertasAProducto(producto: Producto, calendar:Calendar, metodoDePago: MetodoDePago): void{
        this.estado = SingletonEstado.getInstance();

        let ofertas: Oferta[] = this.estado.getOfertas();
        ofertas.forEach(function(oferta: Oferta){
            if(oferta.cumpleReglas(producto, calendar, metodoDePago)){
                producto.agregarOferta(oferta);
            }
        });
    }
}
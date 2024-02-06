import {Regla} from '../../Ofertas/Reglas/Regla';
import Oferta from '../../Ofertas/Oferta';
import Producto from '../Aplicable/Producto';
import MotorDeReglas from '../../MotorDeReglas/MotorDeReglas';
import FabricaDeReglas from '../../Ofertas/Reglas/FabricaDeReglas';

interface JSONReglasYOfertasInterface {
    rules : {}[],
    offers: {}[],
}
const fs = require('fs');

export class Estado{
    private reglas : any;
    private ofertas : any;
    private productos : any;

    constructor(){
        this.reglas = new Map();
        this.ofertas = new Map();
        this.productos = new Map();
    }

    aniadirRegla(codigoRegla : any, regla : Regla){
        this.reglas.set(codigoRegla,regla);
    }

    existeRegla(codigoRegla : any): boolean{
        return this.reglas.has(codigoRegla);
    }

    obtenerRegla(codigo: any): Regla{
        return this.reglas.get(codigo);
    }

    aniadirOferta(codigo : any, oferta: Oferta){
        this.ofertas.set(codigo,oferta);
    }

    aniadirProducto(codigoProducto : any, producto : Producto){
        this.productos.set(codigoProducto,producto);
    }

    getProductos(){
        return this.productos;
    }
    
    getOfertas(){
        return this.ofertas;
    }

    getReglas(){
        return this.reglas;
    }

    inicializarOfertas(jsonReglasYOfertas: JSONReglasYOfertasInterface){

        //Instancio las reglas
        let reglasJSON:{}[] = jsonReglasYOfertas.rules;
        reglasJSON.forEach(function(jsonRegla: any){
            let estado: Estado = SingletonEstado.getInstance();
            let fabricaDeReglas = new FabricaDeReglas();
            let regla: Regla = fabricaDeReglas.crearRegla(JSON.stringify(jsonRegla), estado);
            estado.aniadirRegla(regla.getCodigo(), regla);
        });

        //Instancio las ofertas
        let ofertasJSON:{}[] = jsonReglasYOfertas.offers;
        let motorDeReglas = new MotorDeReglas();
        motorDeReglas.generarOfertas(JSON.stringify(ofertasJSON));
    }

};
export class SingletonEstado {

    static instancia: Estado;

    constructor() {
        throw new Error('No se puede instanciar un Estado. Acceder al mismo con Estado.getInstance()');
    }
    static getInstance(): Estado {
        if (!SingletonEstado.instancia) {
            SingletonEstado.instancia = new Estado();
        }
        return SingletonEstado.instancia;
    }

    static removeInstance(){
        SingletonEstado.instancia = null;
    }
}
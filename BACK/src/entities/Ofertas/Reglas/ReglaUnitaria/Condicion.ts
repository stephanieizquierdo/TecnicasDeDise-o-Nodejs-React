import { Aplicable } from "../../../CarritoDeCompra/Aplicable/Aplicable";


export default abstract class Condicion{
        protected valor: any;
        protected campo: string;

        constructor (valor : any, campo : string){
            this.valor = valor;
            this.campo = campo;
        }

        abstract verificarCondicion(aplicable : Aplicable): boolean;
}
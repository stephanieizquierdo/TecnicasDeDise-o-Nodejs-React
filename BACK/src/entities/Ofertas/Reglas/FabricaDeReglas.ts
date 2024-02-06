import {Estado} from '../../CarritoDeCompra/Estado/Estado';
import FabricaDeReglasCompuestas from './ReglasCompuestas/FabricaDeReglasCompuestas';
import FabricaDeReglasUnitarias from './ReglaUnitaria/FabricaDeReglasUnitarias';

export default class FabricaDeReglas{

    crearRegla(JSONRules:string, estado: Estado): any {

        let objetoRules = JSON.parse(JSONRules);

        let fabricaDeReglasCompuestas = new FabricaDeReglasCompuestas();
        let fabricaDeReglasUnitarias = new FabricaDeReglasUnitarias();
        
        if (['EQUALS','IN', 'DISTINCT', 'HIGHER', 'LOWER'].indexOf(objetoRules.type) >= 0){
            return fabricaDeReglasUnitarias.crearRegla(JSON.stringify(objetoRules), estado);
        } else if (['AND', 'OR', 'NOT'].indexOf(objetoRules.type) >= 0){
            return fabricaDeReglasCompuestas.generarReglaCompuesta(objetoRules, estado);
        }else{
            throw new Error("La regla " + objetoRules.type +" instanciada no existe.");
        }
    }
}
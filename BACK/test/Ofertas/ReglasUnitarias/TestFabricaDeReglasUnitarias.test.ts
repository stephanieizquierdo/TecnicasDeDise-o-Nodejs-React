import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import { Estado, SingletonEstado } from "../../../src/entities/CarritoDeCompra/Estado/Estado";
import FabricaDeReglasUnitarias from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/FabricaDeReglasUnitarias";
import reglaUnitariaEquals from "../archivosDePrueba/reglaUnitariaEquals.json"
import JSONproducto from '../archivosDePrueba/producto.json';

let chai = require('chai');
var assert = chai.assert;

describe ('Fabrica de reglas unitarias', function(){

    it ('Dado un json de una regla unitaria, se crea una regla correctamente.', () => {

        let fabricaDeReglasUnitarias = new FabricaDeReglasUnitarias();
        let estado:Estado = SingletonEstado.getInstance();

        let reglaEquals = fabricaDeReglasUnitarias.crearRegla(JSON.stringify(reglaUnitariaEquals),estado);
        let producto = new Producto(JSON.stringify(JSONproducto));
        assert.equal(reglaEquals.getCodigo(), reglaUnitariaEquals.code);
        assert.equal(reglaEquals.verificarRegla(producto,null,null), true);
    });
});
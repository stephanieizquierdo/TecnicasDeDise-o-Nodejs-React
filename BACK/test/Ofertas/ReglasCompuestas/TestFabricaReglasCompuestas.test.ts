import FabricaDeReglasCompuestas from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/FabricaDeReglasCompuestas";
import FabricaDeReglasUnitarias from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/FabricaDeReglasUnitarias";
import reglaCompuestaConReglasSimples from "../archivosDePrueba/reglaCompuestaConReglasSimples.json";
import reglaCompuestaConReferencia from "../archivosDePrueba/reglaCompuestaConReferencia.json";
import {SingletonEstado, Estado} from "../../../src/entities/CarritoDeCompra/Estado/Estado";
import ReglaCompuesta from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/ReglaCompuesta";
import {Regla} from "../../../src/entities/Ofertas/Reglas/Regla";
import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONcalendarioFallido from '../archivosDePrueba/calendarioFallido.json';
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONproductoFallido from '../archivosDePrueba/productoFallido.json';
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';



let chai = require('chai');
var assert = chai.assert;

describe('Fabrica de Reglas Compuestas', function(){

    it('Dado un JSON de reglas compuestas que define otras reglas unitarias, estas se generan correctamente.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReglasSimples));
        let estado:Estado = SingletonEstado.getInstance();

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);
        assert.equal(regla.getCodigo(), objetoJSON.code);
    });

    it('Dado un JSON de reglas compuestas que referencia a reglas del estado se genera correctamente.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();
        let fabReglasUnitarias = new FabricaDeReglasUnitarias();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReferencia.compuesta));
        let estado:Estado = SingletonEstado.getInstance();
        for(let i=0; i<=1; i++){
            let reglaSimple = fabReglasUnitarias.crearRegla(JSON.stringify(reglaCompuestaConReferencia.simples[i]), estado);
            estado.aniadirRegla(reglaSimple.getCodigo(), reglaSimple);
        }

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);
        assert.equal(regla.getCodigo(), objetoJSON.code);
    });

    it('Dado un JSON de reglas compuestas que referencia a una sola regla del estado se genera correctamente.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();
        let fabReglasUnitarias = new FabricaDeReglasUnitarias();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReferencia.compuesta_con_una_ref));
        let estado:Estado = SingletonEstado.getInstance();
        for(let i=0; i<=0; i++){
            let reglaSimple = fabReglasUnitarias.crearRegla(JSON.stringify(reglaCompuestaConReferencia.simples[i]), estado);
            estado.aniadirRegla(reglaSimple.getCodigo(), reglaSimple);
        }

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);
        assert.equal(regla.getCodigo(), objetoJSON.code);
    });

    it('Dado un JSON de reglas compuestas que define otras reglas unitarias, la validación de la regla es correcta.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReglasSimples));
        let estado:Estado = SingletonEstado.getInstance();

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);

        let calendario = new Calendar(JSON.stringify(JSONcalendario));
        let producto = new Producto(JSON.stringify(JSONproducto));
        let MDP = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        let calendarioFallido = new Calendar(JSON.stringify(JSONcalendarioFallido));

        assert.equal(regla.verificarRegla(producto, calendario, MDP), true);
        assert.equal(regla.verificarRegla(producto, calendarioFallido, MDP), false);

    });

    it('Dado un JSON de reglas compuestas que referencia a reglas del estado, la validación es correcta.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();
        let fabReglasUnitarias = new FabricaDeReglasUnitarias();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReferencia.compuesta));
        let estado:Estado = SingletonEstado.getInstance();
        for(let i=0; i<=1; i++){
            let reglaSimple = fabReglasUnitarias.crearRegla(JSON.stringify(reglaCompuestaConReferencia.simples[i]), estado);
            estado.aniadirRegla(reglaSimple.getCodigo(), reglaSimple);
        }

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);
        
        let calendario = new Calendar(JSON.stringify(JSONcalendario));
        let producto = new Producto(JSON.stringify(JSONproducto));
        let MDP = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        let productoFallido = new Producto(JSON.stringify(JSONproductoFallido));

        assert.equal(regla.verificarRegla(producto, calendario, MDP), true);
        assert.equal(regla.verificarRegla(productoFallido, calendario, MDP), false);
    });

    it('Dado un JSON de reglas compuestas que referencia a una sola regla del estado, la validación es correcta.', () =>{

        let fabReglasCompuestas = new FabricaDeReglasCompuestas();
        let fabReglasUnitarias = new FabricaDeReglasUnitarias();

        let objetoJSON = JSON.parse(JSON.stringify(reglaCompuestaConReferencia.compuesta_con_una_ref));
        let estado:Estado = SingletonEstado.getInstance();
        let reglaSimple = fabReglasUnitarias.crearRegla(JSON.stringify(reglaCompuestaConReferencia.simples[0]), estado);
        estado.aniadirRegla(reglaSimple.getCodigo(), reglaSimple);

        let regla:Regla = fabReglasCompuestas.generarReglaCompuesta(objetoJSON, estado);
        
        let calendario = new Calendar(JSON.stringify(JSONcalendario));
        let productoNoCumple = new Producto(JSON.stringify(JSONproducto));
        let MDP = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        let productoCumpleNot = new Producto(JSON.stringify(JSONproductoFallido));

        assert.equal(regla.verificarRegla(productoNoCumple, calendario, MDP), false);
        assert.equal(regla.verificarRegla(productoCumpleNot, calendario, MDP), true);
    });


});
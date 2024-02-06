import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import { Regla } from "../../../src/entities/Ofertas/Reglas/Regla";
import FuncionLogicaNot from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/FuncionLogicaNot";
import ReglaCompuesta from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/ReglaCompuesta";
import CondicionIn from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionIn";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import CondicionDistinct from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionDistinct";
import CondicionEquals from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionEquals";

let chai = require('chai');
var assert = chai.assert;

describe('Regla Compuesta Not', function() {

    it ('Dada una regla NOT con una regla unitaria que se aplica se devuelve que no aplica', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);

        let reglas: Regla[] = [];
        reglas.push(reglaIn);
        
        let not = new FuncionLogicaNot();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,not);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,false)
    })  
    
    it ('Dada una regla NOT con una regla unitaria que no se aplica se devuelve que aplica', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionDistinct = new CondicionDistinct("AAR453J","product.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaDistinct);
        
        let not = new FuncionLogicaNot();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,not);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    }) 

    it ('Dada una regla NOT con una regla compuesta NOT que cumple entonces no se aplica', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionDistinct = new CondicionDistinct("AAR453J","product.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaDistinct);
        
        let not = new FuncionLogicaNot();
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,not);

        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaCompuestaPrimeraComposicion);
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,not);
    
        let resultado = reglaCompuestaSegundaComposicion.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,false)
    }) 

    it ('Dada una regla NOT con una regla compuesta NOT que no cumple entonces  se aplica', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionEquals = new CondicionEquals("AAR453J","product.code");
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaEquals);
        
        let not = new FuncionLogicaNot();
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,not);

        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaCompuestaPrimeraComposicion);
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,not);
    
        let resultado = reglaCompuestaSegundaComposicion.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    }) 

});
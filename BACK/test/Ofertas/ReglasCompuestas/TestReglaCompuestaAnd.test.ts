import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import { Regla } from "../../../src/entities/Ofertas/Reglas/Regla";
import FuncionLogicaAnd from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/FuncionLogicaAnd";
import ReglaCompuesta from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/ReglaCompuesta";
import CondicionIn from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionIn";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import CondicionEquals from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionEquals";
import CondicionHigher from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionHigher";
import CondicionDistinct from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionDistinct";
import CondicionLower from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionLower";


let chai = require('chai');
var assert = chai.assert;

describe('Regla compuesta And', function() {

    it ('Dada una regla compuesta AND con dos reglas unitarias, se dan ambas condiciones entonces se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglas: Regla[] = [];
        reglas.push(reglaIn);
        reglas.push(reglaEquals);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    });

    it ('Dada una regla compuesta AND con dos reglas unitarias con solo una regla que aplica entonces no se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionHigher = new CondicionHigher(50,"PRODUCT.price");
        let reglaHigher = new ReglaUnitaria('00', "Regla higher", condicionHigher);
        let condicionDistinct = new CondicionDistinct("12345","product.category.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaDistinct);
        reglas.push(reglaHigher);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,false)
    });

    it ('Dada una regla compuesta AND con dos reglas unitarias donde ninguna regla aplica entonces no se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionLower = new CondicionLower(10,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionDistinct = new CondicionDistinct("AAR453J","product.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaDistinct);
        reglas.push(reglaLower);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,false)
    });

    it ('Dada una regla compuesta AND con una regla unitaria y otra compuesta donde una regla aplica entonces se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaInPrimeraComposicion = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEqualsPrimeraComposicion = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaInPrimeraComposicion);
        reglasPrimeraComposicion.push(reglaEqualsPrimeraComposicion);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,and);

        let condicionLower = new CondicionLower(50,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);

        let reglas: Regla[] = [];
        reglas.push(reglaCompuestaPrimeraComposicion);
        reglas.push(reglaLower);
        
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    });

    it ('Dada una regla compuesta AND con cuatro reglas unitarias donde todas las regla aplican entonces se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let distinct = new CondicionDistinct("12345","product.category.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", distinct);
        let equals = new CondicionEquals(1,"calendar.month");
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", equals);
        let higher = new CondicionHigher(10,"PRODUCT.price");
        let reglaHigher = new ReglaUnitaria('00', "Regla higher", higher);
        let condicionIn = new CondicionIn(["CREDIT","DEBIT"],"PAYMENT.method");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);

        let reglas: Regla[] = [];
        reglas.push(reglaDistinct);
        reglas.push(reglaHigher);
        reglas.push(reglaEquals);
        reglas.push(reglaIn);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    });

    it ('Dada una regla compuesta AND con dos reglas compuestas que cumplen cada una entonces se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaInPrimeraComposicion = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEqualsPrimeraComposicion = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaInPrimeraComposicion);
        reglasPrimeraComposicion.push(reglaEqualsPrimeraComposicion);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,and);

        let condicionLower = new CondicionLower(50,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionDistinct = new CondicionDistinct('BBVA', 'PAYMENT.entity');
        let reglaDistint = new ReglaUnitaria('00', 'Regla distint', condicionDistinct);

        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaLower);
        reglasSegundaComposicion.push(reglaDistint);

        let and2 = new FuncionLogicaAnd();
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,and2);

        let reglas: Regla[] = [];
        reglas.push(reglaCompuestaPrimeraComposicion);
        reglas.push(reglaCompuestaSegundaComposicion);
        
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,true)
    });

    it ('Dada una regla compuesta AND con dos reglas compuestas donde una cumple y la otra no  entonces no se puede aplicar', ()=> {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));

        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaInPrimeraComposicion = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEqualsPrimeraComposicion = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaInPrimeraComposicion);
        reglasPrimeraComposicion.push(reglaEqualsPrimeraComposicion);
        
        let and = new FuncionLogicaAnd();
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,and);

        let condicionLower = new CondicionLower(50,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionDistinct = new CondicionDistinct('GALICIA', 'PAYMENT.entity');
        let reglaDistint = new ReglaUnitaria('00', 'Regla distint', condicionDistinct);

        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaLower);
        reglasSegundaComposicion.push(reglaDistint);

        let and2 = new FuncionLogicaAnd();
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,and2);

        let reglas: Regla[] = [];
        reglas.push(reglaCompuestaPrimeraComposicion);
        reglas.push(reglaCompuestaSegundaComposicion);
        
        let reglaCompuesta = new ReglaCompuesta('00',reglas,and);

        let resultado = reglaCompuesta.verificarRegla(producto, calendario, metodoDePago);

        assert.equal(resultado,false)
    });
})
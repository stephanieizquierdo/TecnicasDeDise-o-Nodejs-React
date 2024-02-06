import Calendar from "../../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../../src/entities/CarritoDeCompra/Aplicable/Producto";
import JSONproducto from '../archivosDePrueba/producto.json';
import JSONcalendario from '../archivosDePrueba/calendario.json';
import JSONmetodoDePago from '../archivosDePrueba/metodoDePago.json';
import { Regla } from "../../../src/entities/Ofertas/Reglas/Regla";
import CondicionIn from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionIn";
import ReglaUnitaria from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/ReglaUnitaria";
import CondicionEquals from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionEquals";
import FuncionLogicaOr from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/FuncionLogicaOr";
import ReglaCompuesta from "../../../src/entities/Ofertas/Reglas/ReglasCompuestas/ReglaCompuesta";
import CondicionDistinct from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionDistinct";
import CondicionLower from "../../../src/entities/Ofertas/Reglas/ReglaUnitaria/CondicionLower";

let chai = require('chai');
var assert = chai.assert;

describe('Regla Compuesta Or', function(){

    it ('Dada una regla compuesta OR con dos reglas unitarias, se cumplen ambas entonces se puede aplicar', () => {
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

        let or = new FuncionLogicaOr()
        let reglaCompuesta = new ReglaCompuesta('00',reglas,or);

        let resultado = reglaCompuesta.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,true);
    })

    it ('Dada una regla compuesta OR con dos reglas unitarias, se cumple solo una entonces se puede aplicar', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        
        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionDistinct = new CondicionDistinct("12345","product.category.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaIn);
        reglas.push(reglaDistinct);

        let or = new FuncionLogicaOr()
        let reglaCompuesta = new ReglaCompuesta('00',reglas,or);

        let resultado = reglaCompuesta.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,true);
    })

    it ('Dada una regla compuesta OR con dos reglas unitarias, ninguna se cumple entonces no se puede aplicar', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        
        let condicionLower = new CondicionLower(10,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionDistinct = new CondicionDistinct("AAR453J","product.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaLower);
        reglas.push(reglaDistinct);

        let or = new FuncionLogicaOr()
        let reglaCompuesta = new ReglaCompuesta('00',reglas,or);

        let resultado = reglaCompuesta.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,false);
    });

    it ('Dada una regla compuesta OR con una regla unitarias y otra compuesta, se cumplen ambas entonces se puede aplicar', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        
        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", condicionEquals);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaIn);
        reglasPrimeraComposicion.push(reglaEquals);

        let or = new FuncionLogicaOr()
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,or);

        let condicionLower = new CondicionLower(80,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);

        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaCompuestaPrimeraComposicion);
        reglasSegundaComposicion.push(reglaLower)
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,or)
        let resultado = reglaCompuestaSegundaComposicion.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,true);
    })


    it ('Dada una regla compuesta OR con cuatro reglas unitarias, se cumplen dos entonces se puede aplicar', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        
        let condicionIn = new CondicionIn(["AAR453J","AAR753J"],"PRODUCT.code");
        let reglaIn = new ReglaUnitaria('00', "Regla in", condicionIn);
        let condicionEquals = new CondicionEquals("CREDIT","PAYMENT.method");
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", condicionEquals);
        let condicionLower = new CondicionLower(10,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionDistinct = new CondicionDistinct("AAR453J","product.code");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglas: Regla[] = [];
        reglas.push(reglaIn);
        reglas.push(reglaEquals);
        reglas.push(reglaLower);
        reglas.push(reglaDistinct);
        
        let or = new FuncionLogicaOr()
        let reglaCompuesta = new ReglaCompuesta('00',reglas,or);

        let resultado = reglaCompuesta.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,true);
    })
    it ('Dada una regla compuesta OR con dos reglas compuestas que ninguna cumple  entonces no se puede aplicar', () => {
        let producto = new Producto(JSON.stringify(JSONproducto));
        let calendario = new Calendar(JSON.stringify(JSONcalendario)); 
        let metodoDePago = new MetodoDePago(JSON.stringify(JSONmetodoDePago));
        
        let condicionEquals = new CondicionEquals('BBVA', 'PAYMENT.entity')
    
        let reglaEquals = new ReglaUnitaria('00', "Regla equals", condicionEquals);
        let condicionDistinct = new CondicionDistinct("CREDIT","PAYMENT.method");
        let reglaDistinct = new ReglaUnitaria('00', "Regla distinct", condicionDistinct);

        let reglasPrimeraComposicion: Regla[] = [];
        reglasPrimeraComposicion.push(reglaEquals);
        reglasPrimeraComposicion.push(reglaDistinct);

        let or = new FuncionLogicaOr()
        let reglaCompuestaPrimeraComposicion = new ReglaCompuesta('00',reglasPrimeraComposicion,or);

        let condicionLower = new CondicionLower(10,"PRODUCT.price");
        let reglaLower = new ReglaUnitaria('00', "Regla lower", condicionLower);
        let condicionIn = new CondicionIn(['2000','2021','2015'], 'CALENDAR.year');
        let reglaIn = new ReglaUnitaria('01','Regla in', condicionIn);

        
        let reglasSegundaComposicion: Regla[] = [];
        reglasSegundaComposicion.push(reglaLower);
        reglasSegundaComposicion.push(reglaIn);

        let or2 = new FuncionLogicaOr();
        let reglaCompuestaSegundaComposicion = new ReglaCompuesta('00',reglasSegundaComposicion,or2);
        
        let reglaOrs: Regla[] = [];
        reglaOrs.push(reglaCompuestaPrimeraComposicion, reglaCompuestaSegundaComposicion);

        let reglaCompuestaFinalComposicion = new ReglaCompuesta('00',reglaOrs,or)
        let resultado = reglaCompuestaFinalComposicion.verificarRegla(producto,calendario,metodoDePago);
        
        assert.equal(resultado,false);
    })


})
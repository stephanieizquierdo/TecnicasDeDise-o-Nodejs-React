import Calendar from '../../../src/entities/CarritoDeCompra/Aplicable/Calendar';

let chai = require('chai');
var assert = chai.assert;

const YEAR = "calendar.year"
const MONTH = "calendar.month"
const DAY_NUMBER = "calendar.day_number"
const WEEK_DAY = "calendar.week_day"
const WEEK_NUMBER = "calendar.week_number"

describe('Calendar', function(){
    it('Debería inicializarse con un estado inicial correcto si el JSON está bien.', ()=>{
        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(YEAR),2020);
        assert.equal(calendar.getAttribute(MONTH), 1);
        assert.equal(calendar.getAttribute(DAY_NUMBER), 22);
        assert.equal(calendar.getAttribute(WEEK_DAY), "Wednesday");
        assert.equal(calendar.getAttribute(WEEK_NUMBER),4);
    });

    it('No debería instanciarse si el JSON está bien pero le faltan campos.', ()=>{

        let errorHappened = false;
        try{
            let calendar = new Calendar(JSON.stringify({
                "month":1,
                "day_number": 22,
                "week_day": "Wednesday",
                "week_number" : 4
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar calendario");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);

        errorHappened = false;
        try{
            let calendar = new Calendar(JSON.stringify({
                "year": 2020,
                "day_number": 22,
                "week_day": "Wednesday",
                "week_number" : 4
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar calendario");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);

        errorHappened = false;
        try{
            let calendar = new Calendar(JSON.stringify({
                "year": 2020,
                "month":1,
                "week_day": "Wednesday",
                "week_number" : 4
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar calendario");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);

        errorHappened = false;
        try{
            let calendar = new Calendar(JSON.stringify({
                "year": 2020,
                "month":1,
                "day_number": 22,
                "week_number" : 4
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar calendario");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);

        errorHappened = false;
        try{
            let calendar = new Calendar(JSON.stringify({
                "year": 2020,
                "month":1,
                "day_number": 22,
                "week_day": "Wednesday"
            }));
        }catch(error: any){
            assert.equal(error.message, "JSON inválido al instanciar calendario");
            errorHappened = true;
        }
        assert.equal(errorHappened, true);
        
    });

    it('Si le pido el atributo YEAR me devuelve el año', ()=>{

        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(YEAR), 2020);
        
    });

    it('Si le pido el atributo MONTH me devuelve el mes', ()=>{

        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(MONTH), 1);
        
    });

    it('Si le pido el atributo DAY_NUMBER me devuelve el número del día', ()=>{

        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(DAY_NUMBER), 22);
        
    });

    it('Si le pido el atributo WEEK_DAY me devuelve el día de la semana', ()=>{

        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(WEEK_DAY), 'Wednesday');
        
    });

    it('Si le pido el atributo WEEK_NUMBER me devuelve el número de semana en el mes', ()=>{

        let calendar = new Calendar(JSON.stringify({
            "year": 2020,
            "month":1,
            "day_number": 22,
            "week_day": "Wednesday",
            "week_number" : 4
        }));

        assert.equal(calendar.getAttribute(WEEK_NUMBER), 4);
        
    });
});
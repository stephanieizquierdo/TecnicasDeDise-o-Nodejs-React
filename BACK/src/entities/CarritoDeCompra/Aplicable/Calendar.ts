import {Aplicable} from './Aplicable'

const YEAR = "calendar.year"
const MONTH = "calendar.month"
const DAY_NUMBER = "calendar.day_number"
const WEEK_DAY = "calendar.week_day"
const WEEK_NUMBER = "calendar.week_number"

var Validator = require("jsonschema").Validator;

export default class Calendar implements Aplicable{
    
    private jsonValidSchema: {};

    private year: string;
	private month: number;
	private day_number: number;
	private week_day: string;
	private week_number : number;

    constructor(JSONCalendario: string){
       
        this.jsonValidSchema = {
            "type": "object",
            "properties": {
                "year": {"type": "integer"},
                "month": {"type": "integer"},
	            "day_number": {"type": "integer"},
	            "week_day": {"type":"string"},
	            "week_number" : {"type":"integer"}
            },
            "required": ["year", "month", "day_number", "week_day", "week_number"],
        };

        let objectCalendar = JSON.parse(JSONCalendario);

        let validator = new Validator();
        if (!validator.validate(objectCalendar, this.jsonValidSchema).valid){
            throw new Error("JSON inválido al instanciar calendario");
        }
        
        this.year = objectCalendar.year;
        this.month = objectCalendar.month;
        this.day_number = objectCalendar.day_number;
        this.week_day = objectCalendar.week_day;
        this.week_number = objectCalendar.week_number;

    }
    
    getAttribute(attribute:string): any{
        if (attribute.toLowerCase() === YEAR){
            return this.year;
        }else if (attribute.toLowerCase() === MONTH){
            return this.month;
        }else if (attribute.toLowerCase() === DAY_NUMBER){
            return this.day_number;
        }else if (attribute.toLowerCase() === WEEK_DAY){
            return this.week_day;
        }else if (attribute.toLowerCase() === WEEK_NUMBER){
            return this.week_number;
        }
        throw new Error("El atributo solicitado no existe en el calendario.");
    }
}


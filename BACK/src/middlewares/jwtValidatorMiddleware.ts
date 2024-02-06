import { RequestHandler } from "express";
import { getAccounts, getValidTokens } from "../services/accountsService";


const config = process.env;

const jwt = require("jsonwebtoken");

export const jwtValidatorMiddleware: RequestHandler = (req, res, next) => {
    let jwtReceived = req.headers.jwt;
    
    if(!jwtReceived){
        return res.status(403).send("Token not specified for request.");
    }

    try{
        const decoded = jwt.verify(jwtReceived, config.TOKEN_KEY);
        if(getValidTokens()[decoded.user] != jwtReceived){
            throw new Error("Token Expired");
        }
        let accounts = getAccounts();
        let cuentaDada = accounts.get(decoded.user);
        if(cuentaDada == null || cuentaDada == undefined || cuentaDada.user != decoded.user || cuentaDada.password != decoded.password){
            throw new Error("Invalid token specified.");
        }
    }catch(exception: any){
        return res.status(401).send(exception.message);
    }
    next();
}
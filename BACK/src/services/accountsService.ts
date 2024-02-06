const config = process.env;
const jwt = require("jsonwebtoken");

let account: {
    "user": string,
    "password": string
};

let accountsRegistered = new Map();
let validTokens: {[user:string]: string} = {};

let response:{
    data: {},
    message: string,
} = {
    data: {},
    message: ''
};

function createJSONWebToken(user:string, password:string){
    return jwt.sign({"user":user, "password": password}, config.TOKEN_KEY, {expiresIn: "600s"});
}

export function login(req: any){
    let cuentaRegistrada = accountsRegistered.get(req.body.data.user);
    if(cuentaRegistrada != null && cuentaRegistrada != undefined && cuentaRegistrada.user == req.body.data.user && cuentaRegistrada.password == req.body.data.password){
        let JSONWebTokenForLoggedUser = createJSONWebToken(req.body.data.user, req.body.data.password);
        response.data = {"jwt": JSONWebTokenForLoggedUser};
        validTokens[req.body.data.user] = JSONWebTokenForLoggedUser;
        response.message = "Logged in succesfully.";
    }else{
        throw new Error("Invalid Credentials.");
    }
    return response;
}

export function register(req: any){
    let cuentaRegistrada = accountsRegistered.get(req.body.data.user);
    if( cuentaRegistrada != null && cuentaRegistrada != undefined ){
        throw new Error ("User " + req.body.data.user + " does already exist.");
    }else{
        accountsRegistered.set(req.body.data.user, {"user": req.body.data.user, "password": req.body.data.password});
        let JSONWebTokenForLoggedUser = createJSONWebToken(req.body.data.user, req.body.data.password);
        response.data = {"jwt": JSONWebTokenForLoggedUser};
        validTokens[req.body.data.user] = JSONWebTokenForLoggedUser;
        response.message = "User " + req.body.data.user + " was created succesfully.";
    }
    return response;
}

export function getAccounts(){
    return accountsRegistered;
}

export function getValidTokens(){
    return validTokens;
}
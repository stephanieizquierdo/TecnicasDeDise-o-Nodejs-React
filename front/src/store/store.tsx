//este e va a encarga de agregar las cosas

export default class Store {
        userToken: string;
        payload: string;
        productosSeleccionados:{[key: string]: number};

    constructor(){
        this.userToken = "";
        this.payload = "";
    }

    agregarPayload (tipo: string , banco: string){
        this.payload = tipo + banco;
    }

    agregarToken (token: string) {
        this.userToken = token;
    }

    
}



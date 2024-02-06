import { Cart, Offers, ProcessedProduct, Product } from "./types";
import { Estado, SingletonEstado } from "../../src/entities/CarritoDeCompra/Estado/Estado";
import CarritoDeCompras from "../../src/entities/CarritoDeCompra/CarritoDeCompras";
import Calendar from "../../src/entities/CarritoDeCompra/Aplicable/Calendar";
import MetodoDePago from "../../src/entities/CarritoDeCompra/Aplicable/MetodoDePago";
import Producto from "../../src/entities/CarritoDeCompra/Aplicable/Producto";

// TODO: Replace this with the actual type
type State = Offers;

interface JSONReglasYOfertasInterface {
    rules : {}[],
    offers: {}[],
}
const fs = require('fs');

export function initializeOffers(offers: Offers): State {
	SingletonEstado.removeInstance();
	let estado = SingletonEstado.getInstance();
	estado.inicializarOfertas(offers);

	return {"offers": offers.offers, "rules": offers.rules};
}

export function processProducts(state: State, cart: Cart): ProcessedProduct[] {
	initializeOffers(state);
	let metodoDePago = new MetodoDePago(JSON.stringify(cart.payment));
	let calendar = new Calendar(JSON.stringify(cart.purchase_date));
	let carritoDeCompra = new CarritoDeCompras(metodoDePago, calendar);
	for (let i=0; i < cart.products.length; i++){
		let productoCarrito: Producto = new Producto(JSON.stringify(cart.products[i]));
		carritoDeCompra.agregarProducto(productoCarrito);
	}
	return carritoDeCompra.procesarCarrito();
}

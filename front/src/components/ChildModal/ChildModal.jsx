import React from 'react';
import {crearCarrito,agregarItemsCarrito, procesarCarrito, eliminarCarrito} from '../../services/CarritoService';
import {Box, Button, Modal} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    height: "70vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY:"scroll",
    pt: 2,
    px: 4,
    pb: 3,
  };

let acum=0;

export default class ChildModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            "ofertasAplicadas": [],
            "carritoProcesado": [],
            "openModal": false,
            "metodo": props.metodo,
            "banco": props.banco,
            "montoFinal": "0.00",
        };
        this.procesarCarrito = this.procesarCarrito.bind(this);
    }

    async procesarCarrito(){
        try{
            await crearCarrito( this.state.metodo, this.state.banco );
        } catch (error) {
            await eliminarCarrito();
            await crearCarrito();
        }
        try{
            let productos = [];
            for (var i = 0; i < localStorage.length; i++) {
                if(localStorage.key(i) !== "tokenUser"){
                    const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    productos.push(obj);
                }		
            }
           await agregarItemsCarrito(productos);
        } catch (error) {
            alert(error);
        }
        let carritoProcesado = await procesarCarrito();
        let acum = 0;
        carritoProcesado.forEach(function(producto){
          acum += parseFloat(producto.final_price) * producto.quantity;
        });
        this.setState({"carritoProcesado": carritoProcesado, "montoFinal": acum.toFixed(2)});
    }

    render(){

        return (
            <React.Fragment>
              <Button onClick={()=>{
                this.setState({"openModal": true}); 
                this.procesarCarrito();
              }}>
                COMPRAR
              </Button>
              <Modal
                hideBackdrop
                open={this.state.openModal}
                onClose={()=>{}}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style}}>
                    <h2> Productos comprados: </h2>
                    {this.state.carritoProcesado && this.state.carritoProcesado.map((item, index)=>{
                            return (
                                <li key={index} style={{"marginTop":"0.75em"}}>
                                    {item.name + " | Cantidad: " + item.quantity + " | Precio Unitario Final: $" + item.final_price }
                                    <ol>
                                        {item.discounts.map((itemDiscount, index)=>{
                                            const tipo = itemDiscount.type==='FIX'?'$ ':'';
                                            const symbol = itemDiscount.type!=='FIX'?' %':'';
                                            return (
                                                <li key={index} style={{"paddingBottom":"1em", color: "red"}}>
                                                    {"Ofertas aplicadas: "+ item.offers_desc[index] + " | Valor: -"+tipo + itemDiscount.value + symbol}
                                                </li>
                                            );
                                        })}                                            
                                    </ol>
                                </li>
                            );
                        })}
                        <div>
                            <h2> Monto total: {'$ ' + this.state.montoFinal} </h2>
                        </div>    
                  <Button onClick={()=>{this.setState({"openModal": false})}}>Cerrar Detalle</Button>
                </Box>
              </Modal>
            </React.Fragment>
        );
    }
};

/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {Box, Button, Typography, Modal,
	 Select, MenuItem, FormHelperText, FormControl, InputLabel} from '@mui/material';
import ChildModal from '../ChildModal/ChildModal';

const style = {
	posicion: "absolute",
	top: '50%',
	left: '50%',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default class ModalCarrito extends React.Component{

    constructor(props){
        super(props);
        let productos = [];
        for (var i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) !== "tokenUser"){
                const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                productos.push(obj);
            }		
        }
        this.state = {
            productosCarrito: productos,
            metodo: 'DEBIT',
            banco: 'Galicia',
            open: false,
        };
        this.clearProducts = this.clearProducts.bind(this);
    }
    
    componentDidMount(){
        window.addEventListener('storage', () => {
            this.clearProducts();
            this.defineProducts();
        });
    }


    defineProducts(){
        let productosCarrito = [];
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) !== "tokenUser"){
                const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                productosCarrito.push(obj);
            }		
        }
        this.setState({"productosCarrito": productosCarrito});
    }


    clearProducts() {
        this.setState({"productosCarrito": []});
    }


    render(){
        return (
            <div>
            <Button onClick={()=> {this.setState({"open": true});}}>Ver carrito</Button>
            <Modal
                open={this.state.open}
                onClose={()=>{this.setState({"open": false});}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Carrito
                    </Typography>
                    {this.state.productosCarrito.map((item, index)=>{
                            return (
                                <li key={index} style={{"marginTop":"0.75em"}}>
                                    {item.item.nombre +
                                     " | Cantidad: " +item.cant + " | Precio Unitario: $" +
                                     (Number((item.item.precioBase*(100+item.item.porcentajeIva))/100)).toFixed(2)
                                     }
                                </li>
                            );
                        })}
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth style={{"marginTop":"1em"}}>
                            <InputLabel id="demo-simple-select-label">Tipo de Tarjeta</InputLabel>
                            <Select
                                labelId="Metodo de pago"
                                id="outline-metodo-select"
                                value={this.state.metodo}
                                label="Tipo de Tarjeta"
                                onChange={(event) => {this.setState({"metodo": event.target.value})}}
                            >
                                <MenuItem value={"DEBIT"}>Debito</MenuItem>
                                <MenuItem value={"CREDIT"}>Credito</MenuItem>
    
                            </Select>
                            
                        </FormControl>
                        <FormHelperText>Required</FormHelperText>
                        <FormControl fullWidth style={{"marginTop":"1em"}}>
                            <InputLabel id="demo-simple-select-label">Banco</InputLabel>
                            <Select
                                labelId="Metodo de pago"
                                id="outline-metodo-select"
                                value={this.state.banco}
                                label="Banco"
                                onChange={(event) => {this.setState({"banco": event.target.value})}}
                            >
                                <MenuItem value={"Galicia"}>Galicia</MenuItem>
                                <MenuItem value={"BBVA"}>BBVA</MenuItem>
                                <MenuItem value={"Santander Rio"}>Santander Rio</MenuItem>
                                <MenuItem value={"Nacion"}>Nacion</MenuItem>
                                <MenuItem value={"Provincia"}>Provincia</MenuItem>
                                <MenuItem value={"Macro"}>Macro</MenuItem>
                            </Select>
                            
                        </FormControl>
                        <FormHelperText>Required</FormHelperText>
                        <ChildModal metodo={this.state.metodo} banco={this.state.banco} />
                    </Box>
                </Box>
            </Modal>
            </div>
        );
    }
}
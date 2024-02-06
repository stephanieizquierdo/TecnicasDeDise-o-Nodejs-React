import * as React from 'react';
import {Card, CardActions, CardMedia, CardContent, Button, Typography} from '@mui/material/';

function agregarProducto (nombreProducto: string, obj:any) {
	var nuevoObj= obj;
	nuevoObj.cant = obj.cant + 1;
	var nuevo = JSON.stringify(nuevoObj);
	window.localStorage.setItem(nombreProducto, nuevo);
	window.dispatchEvent(new Event("storage"));
}

function eliminarProducto (nombreProducto: string) {
	var actual = window.localStorage.getItem(nombreProducto);
	var obj = JSON.parse(actual);
	if (obj.cant > 1) {
		obj.cant -= 1;
		var nuevo = JSON.stringify(obj);
		window.localStorage.setItem(nombreProducto, nuevo);
	} else {
		window.localStorage.removeItem(nombreProducto);
	}
	window.dispatchEvent(new Event("storage"));
}

export default function ProductCard(item : any) {
	const substr = item.item.nombre.includes(",")? item.item.nombre.split(",")[0] : item.item.nombre ;
	item.item.nombre = substr;
	const obj = {
		...item,
		cant: 0,
	};
	
	return (
		<Card sx={{ width: 152}} variant="outlined">
			<CardMedia
				component="img"
				height="120"
				image="https://thumbs.dreamstime.com/b/icono-de-la-bolsa-comestibles-o-del-paquete-papel-lleno-ilustraci%C3%B3n-vector-plano-alimentos-aislado-en-fondo-blanco-supermercado-194328677.jpg"
				alt="green iguana"
      		/>
		<CardContent sx={{minHeight:50}}>
			<Typography variant="subtitle2" component="div">
				{substr}
			</Typography>
			<Typography variant="body2">
				${ (Number((item.item.precioBase*(100+item.item.porcentajeIva))/100)).toFixed(2)}
			</Typography>
		</CardContent>
		<CardActions sx={{marginRight:5}}>
			<Button
				size="small"
				onClick={() => {agregarProducto(substr, obj)}}
			>
				<Typography variant="h4">+</Typography>
			</Button>
			<Button
				size="small"
				onClick={() => {eliminarProducto(substr)}}
			>
				<Typography variant="h4">-</Typography>
			</Button>
		</CardActions>
		</Card>
  );
};

const baseUrl = 'http://localhost:4000';

export let crearCarrito = async (tipoTarjeta: string, banco: string) => {
    var myHeaders = new Headers();
    myHeaders.append("jwt", window.localStorage.getItem("tokenUser"));
    myHeaders.append("Content-Type", "application/json");

    var today = new Date();
    let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let date = today.getDate();
	let day = today.getDay();
	let weekOfMonth = Math.ceil((date - 1 - day) / 7);

    var raw = JSON.stringify({
	    "data": {
           "payment": {
                "method": tipoTarjeta,
                "entity": banco
            },
            "purchase_date": {
                "year": today.getFullYear(),
                "month": today.getMonth()+1,
                "day_number": date,
                "week_day": daysArray[day],
                "week_number": weekOfMonth,
            }
        }
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    
    const response = await fetch(baseUrl+"/cart", requestOptions);
	if(response.status === 401 || response.status === 403){
		localStorage.clear();
		window.location.replace("/");
		return;
	}
    let res = await response.json();
    if(response.status >= 300){
        await eliminarCarrito();
        res = await crearCarrito(tipoTarjeta, banco);
    }
    return res;
}

function traducirItemAJsonDeItem(producto){
  return JSON.stringify({
      "category":{
          "code": producto.categoriaProducto.code,
          "name": producto.categoriaProducto.name,
      },
      "code": producto.codigoProducto,
      "brand":{
          "code": producto.marca.code,
          "name": producto.marca.name,
      },
      "name": producto.nombre,
      "iva_percentage": producto.porcentajeIva,
      "price": producto.precioBase
  });
}

export let agregarItemsCarrito = async (productos: any) => {
    return new Promise(async (resolve,reject) => {
      var myHeaders = new Headers();
      myHeaders.append("jwt", window.localStorage.getItem("tokenUser"));
      myHeaders.append("Content-Type", "application/json");
      let responseList = [];
      for (let i = 0; i < productos.length; i ++){
        let producto = productos[i];
        for (let j = 0; j < producto.cant ; j++){
          const obj = JSON.parse(traducirItemAJsonDeItem(producto.item));
          var raw = JSON.stringify({
            "data": {
              "product": obj
            }
          });
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
          };

          const response = await fetch(baseUrl+"/cart/product", requestOptions);
		  if(response.status === 401 || response.status === 403){
				localStorage.clear();
				window.location.replace("/");
				return;
		  }
          const res = await response.json();
          if(response.status >= 300){
            reject(res.error);
          }
          responseList.push(res);
        }
      }  
      resolve(responseList);
    });
    
}

export let eliminarCarrito = async () => {
	var myHeaders = new Headers();
	myHeaders.append("jwt", window.localStorage.getItem("tokenUser"));
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		"data": {}
	});
  
	var requestOptions = {
		method: 'DELETE',
		headers: myHeaders,
		body: raw,
	};

	const response = await fetch(baseUrl+"/cart", requestOptions);
  if(response.status === 401 || response.status === 403){
    localStorage.clear();
    window.location.replace("/");
    return;
  }
	const res = await response.json();
	if(response.status >= 300){
		throw new Error(res.error);
	}
	return res;
}

export let procesarCarrito = async () => {
	var myHeaders = new Headers();
	myHeaders.append("jwt", window.localStorage.getItem("tokenUser"));
  	myHeaders.append("Content-Type", "application/json");
	
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
	};
  
	const response = await fetch(baseUrl+ "/cart/final-prices", requestOptions);
	if(response.status === 401 || response.status === 403){
		localStorage.clear();
    window.location.replace("/");
		return;
	}
	const res = await response.json();
	console.log(res);
	if(response.status >= 300){
		throw new Error(res.error);
	}
	console.log(res.data.products);
	return res.data.products;
}
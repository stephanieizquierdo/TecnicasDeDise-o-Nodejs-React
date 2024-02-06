/* eslint-disable import/no-anonymous-default-export */
const baseUrl = 'http://localhost:4000';

const getProducts = async () => {

    var myHeaders = new Headers();
    myHeaders.append("jwt", window.localStorage.getItem("tokenUser"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    };

    const response = await fetch(baseUrl+"/state/products", requestOptions);
    if(response.status === 401 || response.status === 403){
      localStorage.clear();
      window.location.replace("/");
      return;
    }
    const res = await response.json();
    return res;
}



export default getProducts
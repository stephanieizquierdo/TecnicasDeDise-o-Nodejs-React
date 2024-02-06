
const baseUrl = 'http://localhost:4000/account/login';

const loguearUsuario = async (user: string, password: string ) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "data": {
        "user": user,
        "password": password
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    const response = await fetch(baseUrl, requestOptions);
    const res = await response.json();
    return res.data
}

export default loguearUsuario
import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
  } from "react-router-dom";
  import './App.css';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';

function checkTokenAuth(){
	const token = localStorage.getItem('tokenUser');
	if (!token){
		return false;
	}
	return true;
}

function App() {
	if(!checkTokenAuth()){
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
	  		</Router>
		)
	} else {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
				</Routes>
		</Router>
	);
	}
}

export default App;

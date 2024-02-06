import React from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import Navbar from "../../components/NavBar/NavBar"
import ModalCarrito from "../../components/ModalCarrito/ModalCarrito"
import getProducts from "../../services/ProductsService"


export default class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.getProductsData = this.getProductsData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async getProductsData(){
        return await getProducts();
    }

    async componentDidMount(){
        let productos = await this.getProductsData();
        this.setState({products: productos});
    }

    render(){
        return (
            <div>
                <h2 style={{textAlign:"center"}}> Productos </h2>
                <Navbar/>
                <ModalCarrito/>
                <div style={{display:"flex", justifyContent:"space-around", maxWidth:"80vw", margin:"auto"}}>
                        {
                            this.state.products.map((producto, index) => {
                                return(<ProductCard key={index} item={producto}/>);
                            })
                        }
                </div>
                
            </div>
        );
    }
};
import { Application } from 'express';
import { jwtValidatorMiddleware } from '../middlewares/jwtValidatorMiddleware';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';
import { getCartProducts, 
    crearCarrito, 
    agregarProductoACarrito, 
    eliminarProducto, 
    eliminarUnidadDeProducto,
    procesarCarrito,
    deleteCarrito,
    devolverProductosConPrecioFinal
} from '../services/carritoDeComprasService';

const routes = (app: Application) => {
    app.route('/cart')
        .get(loggerMiddleware,
            jwtValidatorMiddleware, 
            async (req, res) => {
                try {
                    res.status(200).send(getCartProducts(req.headers.jwt));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        )
        .post(loggerMiddleware, 
            jwtValidatorMiddleware, 
            async (req, res) => {
                try {
                    res.status(201).send(crearCarrito(req));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        )
        .delete(loggerMiddleware,
            jwtValidatorMiddleware,
            async (req, res) => {
                try{
                    res.status(200).send(deleteCarrito(req));
                }catch (error:any){
                    res.status(500)
                        .send({"data":{"error":error.message, "stack":error.stack}});
                }
            });

    app.route('/cart/product')
        .post(loggerMiddleware, 
            jwtValidatorMiddleware, 
            async (req, res) => {
                try {
                    res.status(201).send(agregarProductoACarrito(req));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );
    app.route('/cart/product/delete-product')
        .delete(loggerMiddleware, 
            jwtValidatorMiddleware, 
            async (req, res) => {
                try {
                    res.status(200).send(eliminarProducto(req));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );

    app.route('/cart/product/reduce-unit')
        .delete(loggerMiddleware, 
            jwtValidatorMiddleware,
            async (req, res) => {
                try {
                    res.status(200).send(eliminarUnidadDeProducto(req));
                } catch (error: any) {
                res.status(500)
                    .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );

    app.route('/cart/process')
        .post(loggerMiddleware,
            jwtValidatorMiddleware,
            async (req, res) => {
                try {
                    res.status(200).send(procesarCarrito(req));
                } catch (error: any) {
                res.status(500)
                    .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }      
        );

    app.route('/cart/final-prices')
        .get(loggerMiddleware,
            jwtValidatorMiddleware,
            async(req, res) => {
                try {
                    res.status(200).send(devolverProductosConPrecioFinal(req));
                } catch (error: any) {
                res.status(500)
                    .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }
        );
}

export default routes;
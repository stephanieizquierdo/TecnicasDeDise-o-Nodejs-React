import { Application } from 'express';
import { jwtValidatorMiddleware } from '../middlewares/jwtValidatorMiddleware';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';
import { getProducts, getReglas, getOfertas } from '../services/stateService';


const routes = (app: Application) => {
    app.route('/state/products')
        .get(loggerMiddleware, 
            jwtValidatorMiddleware,
            async (req, res) => {
                try {
                  res.status(200).send(JSON.stringify(getProducts()));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );
    
    app.route('/state/rules')
        .get(loggerMiddleware, 
            jwtValidatorMiddleware,
            async (req, res) => {
                try {
                  res.status(200).send(JSON.stringify(getReglas()));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );    
    
    app.route('/state/offers')
        .get(loggerMiddleware, 
            jwtValidatorMiddleware,
            async (req, res) => {
                try {
                  res.status(200).send(JSON.stringify(getOfertas()));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );  
}

export default routes;

import { Application } from 'express';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';
import { login, register } from '../services/accountsService';

const routes = (app: Application) => {
    app.route('/account/login')
        .post(loggerMiddleware, 
            async (req, res) => {
                try {
                    res.status(202).send(login(req));
                } catch (error: any) {
                  res.status(500)
                      .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );
        
    app.route('/account/register')
        .post(loggerMiddleware, 
            async (req, res) => {
                try {
                    res.status(201).send(register(req));
                } catch (error: any) {
                res.status(500)
                    .send({"data":{"error":error.message, "stack":error.stack}});
                }
            }            
        );
}

export default routes;
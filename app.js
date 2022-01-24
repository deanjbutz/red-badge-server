require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers');
const middleware = require('./middleware');

app.use(Express.json());
app.use(middleware.CORS);
app.use('/asset', controllers.assetController);
app.use('/user', controllers.userController);
app.use('/proposal', controllers.proposalController);
app.use('/vote', controllers.voteController);

dbConnection.authenticate()
    .then(() => dbConnection.sync(/*{ force: true }*/))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error: ${err}`);
    });

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger-output.json';
import { repositoryRouter } from './api/routes';
import { GithubClient } from './libs/GithubClient';
import { errorHandler } from './middleware';
import { env } from './utils/envConfig';

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
};

const app = express();

// Initialize Client instance
const ghClient = GithubClient.getInstance();

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Global clients
app.set('ghClient', ghClient);

// Routes
const apiRouter = express.Router();
apiRouter.use('/', repositoryRouter);
app.use('/api/v1', apiRouter);

app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation</title>
    </head>
    <body>
      <h1>Repositories API</h1>
      <p>Check the <a href="http://localhost:${env.PORT}/api-docs/">API documentation</a>.</p>
    </body>
    </html>
  `);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);
console.info('Available Routes:', listEndpoints(app));

export { app };

import { Router } from 'express';

import { findMany } from '../controllers/repositories';

const repositoryRouter: Router = Router();
repositoryRouter.get('/repositories', findMany);

export default repositoryRouter;

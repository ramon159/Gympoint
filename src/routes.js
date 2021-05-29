import { Router } from 'express';

// controllers
import {
  SessionController,
  StudentController,
  PlanController,
  EnrollmentsController,
} from './app/controllers';

// validators
import {
  sessionValidator,
  studentValidator,
  planValidator,
} from './app/middlewares/validators';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', sessionValidator.store, SessionController.store);

// requires auth
routes.use(authMiddleware);

// students
routes.get('/students', StudentController.index);
routes.post('/students', studentValidator.store, StudentController.store);
routes.put('/students/:id', studentValidator.update, StudentController.update);

// plans
routes.get('/plans', PlanController.index);
routes.post('/plans', planValidator.store, PlanController.store);

routes.put('/plans/:id', planValidator.update, PlanController.update);
routes.delete('/plans/:id', planValidator.delete, PlanController.delete);

// enrollments

routes.get('/enrollments', EnrollmentsController.index);
routes.post('/enrollments', EnrollmentsController.store);
routes.put('/enrollments/:id', EnrollmentsController.update);
routes.delete('/enrollments/:id', EnrollmentsController.delete);

// teste
routes.get('/test', (req, res) => {
  res.json(req.token);
});

export default routes;

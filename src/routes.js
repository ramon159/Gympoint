import { Router } from 'express';

// controllers
import {
  SessionController,
  StudentController,
  PlanController,
  EnrollmentController,
  CheckinController,
  HelpOrderController,
} from './app/controllers';

// validators
import {
  sessionValidator,
  studentValidator,
  planValidator,
  enrollmentValidator,
  checkinValidator,
  helpOrderValidator,
} from './app/middlewares/validators';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', sessionValidator.store, SessionController.store);

// checkins
routes.post(
  '/students/:id/checkins',
  checkinValidator.store,
  CheckinController.store
);
routes.get(
  '/students/:id/checkins',
  checkinValidator.show,
  CheckinController.show
);

// help order
routes.post(
  '/students/:id/help-orders',
  helpOrderValidator.store,
  HelpOrderController.store
);

routes.get(
  '/students/:id/help-orders',
  helpOrderValidator.show,
  HelpOrderController.show
);

routes.get('/students/help-orders', HelpOrderController.index);

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
routes.delete('/plans/:id', planValidator.destroy, PlanController.destroy);

// enrollments

routes.get(
  '/enrollments',
  enrollmentValidator.index,
  EnrollmentController.index
);
routes.post(
  '/enrollments',
  enrollmentValidator.store,
  EnrollmentController.store
);
routes.put(
  '/enrollments/:id',
  enrollmentValidator.update,
  EnrollmentController.update
);
routes.delete(
  '/enrollments/:id',
  enrollmentValidator.destroy,
  EnrollmentController.destroy
);

export default routes;

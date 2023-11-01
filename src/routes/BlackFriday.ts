import { routeHelper } from '@/helpers';
import { Router } from 'express';
import { BlackFridayController } from '@/controllers';
import { BlackFridayService } from '@/services';
import { basicAuth } from '@/middlewares';

const balckFridayService = new BlackFridayService();
const blackFridayController = new BlackFridayController(balckFridayService);

export const balckFridayRoutes = Router();

balckFridayRoutes.post(
  routeHelper.getRoutePath('/black-friday'),
  basicAuth,
  blackFridayController.process,
);

import { routeHelper } from '@/helpers';
import { Router } from 'express';
import { FaqController } from '@/controllers';
import { FaqService } from '@/services';
import { basicAuth } from '@/middlewares';

const faqService = new FaqService();
const faqController = new FaqController(faqService);

export const faqRoutes = Router();

faqRoutes.post(
  routeHelper.getRoutePath('/faq'),
  basicAuth,
  faqController.process,
);

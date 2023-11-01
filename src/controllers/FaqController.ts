import { Request, Response } from 'express';
import { FaqService } from '@/services/FaqService';

export class FaqController {
  private faqService: FaqService;

  constructor(faqService: FaqService) {
    this.faqService = faqService;
  }

  process = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const response = await this.faqService.sendMessage(body);

      return res.status(200).json({ ok: true, response });
    } catch (ex: any) {
      return res.status(500).json({ error: 'fail send to s3' });
    }
  };
}

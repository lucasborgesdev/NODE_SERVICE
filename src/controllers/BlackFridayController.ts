import { Request, Response } from 'express';
import { BlackFridayService } from '@/services';

export class BlackFridayController {
  private blackFridayService: BlackFridayService;

  constructor(blackFridayService: BlackFridayService) {
    this.blackFridayService = blackFridayService;
  }

  process = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const response = await this.blackFridayService.sendMessage(body);

      return res.status(200).json({ ok: true, response });
    } catch (ex: any) {
      console.log(
        '🚀 ~ file: BlackFridayController.ts:18 ~ BlackFridayController ~ process= ~ ex:',
        ex,
      );
      return res.status(500).json({ error: ex?.response?.data });
    }
  };
}

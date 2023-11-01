"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackFridayController = void 0;

class BlackFridayController {
  constructor(blackFridayService) {
    this.blackFridayService = blackFridayService;
  }

  process = async (req, res) => {
    try {
      const body = req.body;
      const response = await this.blackFridayService.sendMessage(body);
      return res.status(200).json({
        ok: true,
        response
      });
    } catch (ex) {
      console.log('🚀 ~ file: BlackFridayController.ts:18 ~ BlackFridayController ~ process= ~ ex:', ex);
      return res.status(500).json({
        error: ex?.response?.data
      });
    }
  };
}

exports.BlackFridayController = BlackFridayController;
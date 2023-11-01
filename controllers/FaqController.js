"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaqController = void 0;

class FaqController {
  constructor(faqService) {
    this.faqService = faqService;
  }

  process = async (req, res) => {
    try {
      const body = req.body;
      const response = await this.faqService.sendMessage(body);
      return res.status(200).json({
        ok: true,
        response
      });
    } catch (ex) {
      return res.status(500).json({
        error: 'fail send to s3'
      });
    }
  };
}

exports.FaqController = FaqController;
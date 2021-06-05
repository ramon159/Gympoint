import { HelpOrder } from '../models';

export default {
  async store(req, res) {
    const { id } = req.params;
    const helpRequest = await HelpOrder.findByPk(id);

    if (!helpRequest) {
      return res.status(404).json({ message: 'help request id not found' });
    }

    if (helpRequest.answer) {
      return res.status(404).json({ message: 'request already answered' });
    }
    const answer = await helpRequest.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    return res.json(answer);
  },
};

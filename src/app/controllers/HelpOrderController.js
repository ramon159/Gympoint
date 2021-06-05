import { HelpOrder, Enrollment } from '../models';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpRequests = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      order: ['createdAt'],
      attributes: ['id', 'student_id', 'question'],
      offset: (page - 1) * 20,
    });

    return res.json(helpRequests);
  },
  async show(req, res) {
    const { id } = req.params;

    const isEnrolled = await Enrollment.findOne({ where: { student_id: id } });

    if (!isEnrolled) {
      return res.status(404).json({ message: "this student isn't enrolled" });
    }

    const helpRequest = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
      order: ['createdAt'],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (helpRequest.length === 0) {
      return res
        .status(404)
        .json({ message: "this student hasn't any help request" });
    }

    return res.json(helpRequest);
  },
  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const isEnrolled = await Enrollment.findOne({ where: { student_id: id } });

    if (!isEnrolled) {
      return res.status(404).json({ message: "this student isn't enrolled" });
    }

    const data = {
      student_id: id,
      question,
    };

    const helpRequest = await HelpOrder.create(data);
    return res.json(helpRequest);
  },
};

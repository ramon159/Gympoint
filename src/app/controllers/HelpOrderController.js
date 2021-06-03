import { HelpOrder, Enrollment } from '../models';

export default {
  async index(req, res) {
    const helpRequests = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(helpRequests);
  },
  async show(req, res) {
    const { id } = req.params;

    const isEnrolled = await Enrollment.findOne({ where: { student_id: id } });

    if (!isEnrolled) {
      return res.status(404).json({ message: "the student isn't enrolled" });
    }

    const helpRequest = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
    });
    if (helpRequest.length === 0) {
      return res
        .status(404)
        .json({ message: "this student hasn't any help request" });
    }

    return res.json(helpRequest);
  },
  async store(req, res) {
    return res.json();
  },
};

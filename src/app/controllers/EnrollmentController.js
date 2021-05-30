import { addMonths, parseISO, isBefore } from 'date-fns';
import { Enrollment, Plan, Student } from '../models';

export default {
  async index(req, res) {
    const enrollments = await Enrollment.findAll();
    return res.json(enrollments);
  },

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    // transforma string em Date()
    const formattedStartDate = parseISO(start_date);

    if (isBefore(formattedStartDate, new Date())) {
      return res
        .status(404)
        .json({ message: "past dates/hours isn't permitted " });
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
      attributes: ['price', 'duration'],
    });
    // check if student that in use
    const enrolledStudent = await Enrollment.findOne({
      where: { student_id },
    });
    if (enrolledStudent) {
      return res.status(404).json({ message: 'student already enrolled' });
    }
    // check student_id
    const student = await Student.findByPk(student_id);

    // check plan_id
    if (!plan) {
      return res.status(404).json({ message: 'plan id not found' });
    }

    if (!student) {
      return res.status(404).json({ message: 'student id not found' });
    }

    const price = plan.price * plan.duration;

    // eslint-disable-next-line camelcase
    const end_date = addMonths(formattedStartDate, plan.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    return res.json(enrollment);
  },

  async update(req, res) {
    const { id } = req.params;
    return res.json(id);
  },

  async delete(req, res) {
    const { id } = req.params;
    return res.json(id);
  },
};

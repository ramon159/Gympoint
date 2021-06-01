/* eslint-disable camelcase */
import { addMonths, parseISO, isBefore } from 'date-fns';
import { Enrollment, Plan, Student } from '../models';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'price', 'start_date', 'end_date'],

      order: ['id'],
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price'],
        },
      ],
    });

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

    // check if student that in use
    const enrolledStudent = await Enrollment.findOne({
      where: { student_id },
    });
    if (enrolledStudent) {
      return res.status(404).json({ message: 'student already enrolled' });
    }

    // check student_id
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ message: 'student id not found' });
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
      attributes: ['price', 'duration'],
    });

    // check plan_id
    if (!plan) {
      return res.status(404).json({ message: 'plan id not found' });
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
    const { student_id, plan_id, start_date } = req.body;

    // transform string in Date()
    const formattedStartDate = parseISO(start_date);

    const enrollment = await Enrollment.findByPk(id);

    if (start_date !== enrollment.start_date) {
      if (isBefore(formattedStartDate, new Date())) {
        return res
          .status(404)
          .json({ message: "past dates/hours isn't permitted " });
      }
    }

    // check if student alredy enrolled

    if (student_id) {
      const enrolledStudent = await Enrollment.findOne({
        where: { student_id },
      });

      // can exclude in where?

      if (
        enrolledStudent &&
        enrolledStudent.student_id !== enrollment.student_id
      ) {
        return res.status(404).json({ message: 'student already enrolled' });
      }

      const studentExists = await Student.findByPk(student_id);

      if (!studentExists) {
        return res.status(404).json({ message: 'student id not found' });
      }
    }

    // check if student exist
    if (plan_id) {
      if (!start_date) {
        return res.status(404).json({ message: 'start_date id not found' });
      }
      const plan = await Plan.findOne({
        where: { id: plan_id },
        attributes: ['price', 'duration'],
      });

      // check plan_id
      if (!plan) {
        return res.status(404).json({ message: 'plan id not found' });
      }

      req.body.price = plan.price * plan.duration;

      // eslint-disable-next-line camelcase
      req.body.end_date = addMonths(formattedStartDate, plan.duration);
    }
    const newEnrollment = await enrollment.update(req.body);

    return res.json(newEnrollment);
  },

  async delete(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ error: 'enrollment id not found' });
    }

    await enrollment.destroy();

    return res.json({ message: enrollment.dataValues });
  },
};

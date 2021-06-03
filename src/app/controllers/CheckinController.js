import { Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Checkin, Enrollment } from '../models';

export default {
  async show(req, res) {
    const { id } = req.params;
    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: ['createdAt'],
    });

    return res.json(checkins);
  },
  async store(req, res) {
    const { id } = req.params;

    const student = await Enrollment.findOne({ where: { student_id: id } });

    if (!student) {
      return res.status(404).json({ message: 'student is not enrolled' });
    }

    const today = Number(new Date());
    const startDate = Number(subDays(today, 7));

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        createdAt: {
          [Op.between]: [startOfDay(startDate), endOfDay(today)],
        },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ message: 'You already 5 checkins in this week' });
    }
    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  },
};

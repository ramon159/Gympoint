import { Student } from '../models';

export default {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  },
  async store(req, res) {
    const emailExists = await Student.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: 'Email already exists, try another' });
    }
    const student = await Student.create(req.body);

    return res.json(student);
  },
  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;
    const student = await Student.findByPk(id);

    if (email !== student.email) {
      const emailExists = await Student.findOne({ where: { email } });

      if (emailExists) {
        return res
          .status(400)
          .json({ message: 'Email already exists, try another' });
      }
    }

    const studentUpdated = await student.update(req.body);

    return res.json(studentUpdated);
  },
};

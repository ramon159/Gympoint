import { Plan } from '../models';

export default {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    if (plans.length === 0) {
      return res
        .status(404)
        .json({ message: 'no plans have been registered yet' });
    }
    return res.json(plans);
  },
  async store(req, res) {
    const titleExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (titleExists) {
      return res
        .status(400)
        .json({ message: 'plan title already exists, try another' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  },
  async update(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    // verifications
    if (!plan) {
      return res.status(404).json({ message: 'plan id not found' });
    }

    if (req.body.title !== plan.title) {
      const titleExists = await Plan.findOne({
        where: { title: req.body.title },
      });
      if (titleExists) {
        return res
          .status(400)
          .json({ message: 'plan title already exists, try another' });
      }
    }

    const newPlan = await plan.update(req.body);

    return res.json(newPlan);
  },
  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'plan id not exists' });
    }
    const deletedPlan = await plan.destroy();

    return res.json(deletedPlan);
  },
};

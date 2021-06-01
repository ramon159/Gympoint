import * as yup from 'yup';

export default {
  async index(req, res, next) {
    const schema = yup.object().shape({
      page: yup.number().positive().integer(),
    });

    await schema
      .validate(req.query)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async store(req, res, next) {
    const schema = yup.object().shape({
      student_id: yup.number().positive().integer().strict().required(),
      plan_id: yup.number().positive().integer().strict().required(),
      start_date: yup.date().required(),
    });

    await schema
      .validate(req.body)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async update(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      student_id: yup.number().positive().integer().strict(),
      plan_id: yup.number().positive().integer().strict(),
      start_date: yup.date(),
    });

    await schema
      .validate({ ...req.params, ...req.body })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async delete(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
    });

    await schema
      .validate(req.params)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

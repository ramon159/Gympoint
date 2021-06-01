import * as yup from 'yup';

export default {
  async show(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer(),
    });

    await schema
      .validate(req.params)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async store(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer(),
      student_id: yup.number().positive().integer().strict().required(),
    });

    await schema
      .validate({ ...req.body, ...req.params })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

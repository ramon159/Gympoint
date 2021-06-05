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
  async show(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
    });

    await schema
      .validate(req.params)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async store(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      question: yup.string().required(),
    });

    await schema
      .validate({ ...req.params, ...req.body })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

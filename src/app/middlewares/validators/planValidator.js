import * as yup from 'yup';

export default {
  async store(req, res, next) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup.number().positive().integer().strict().required(),
      price: yup.number().positive().strict().required(),
    });

    await schema
      .validate(req.body)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },

  async update(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      title: yup.string(),
      duration: yup.number().positive().integer().strict(),
      price: yup.number().positive().strict(),
    });

    await schema
      .validate({ ...req.params, ...req.body })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async destroy(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
    });

    await schema
      .validate(req.params)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

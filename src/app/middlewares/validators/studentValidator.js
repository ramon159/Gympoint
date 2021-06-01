import * as yup from 'yup';

export default {
  async store(req, res, next) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      age: yup.number().required(),
      weight: yup.number().required(),
      height: yup.number().required(),
    });

    await schema
      .validate(req.body)
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
  async update(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string(),
      email: yup.string().email(),
      age: yup.number(),
      weight: yup.number(),
      height: yup.number(),
    });

    await schema
      .validate({ ...req.params, ...req.body })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

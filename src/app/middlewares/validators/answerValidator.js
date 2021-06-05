import * as yup from 'yup';

export default {
  async store(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      answer: yup.string().required(),
    });

    await schema
      .validate({ ...req.params, ...req.body })
      .then(() => next())
      .catch((err) => res.json({ [err.name]: err.message }));
  },
};

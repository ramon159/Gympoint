import * as yup from 'yup';

export default {
  async store(req, res, next) {
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }
    return next();
  },
};

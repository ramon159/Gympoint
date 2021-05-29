import * as yup from 'yup';

const stringIsInteger = (value) =>
  // eslint-disable-next-line no-restricted-globals
  !isNaN(value) && Number.isInteger(Number(value)); // use regex?

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  age: yup.number().required(),
  weight: yup.number().required(),
  height: yup.number().required(),
});

export default {
  async store(req, res, next) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }
    return next();
  },
  async update(req, res, next) {
    const { id } = req.params;

    if (!stringIsInteger(id)) {
      return res.status(400).json({ error: 'id param must be a integer' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    return next();
  },
};

import * as yup from 'yup';

const stringIsInteger = (value) =>
  // eslint-disable-next-line no-restricted-globals
  !isNaN(value) && Number.isInteger(Number(value)); // use regex?

export default {
  async store(req, res, next) {
    return next();
  },
  async update(req, res, next) {
    const { id } = req.params;

    if (!stringIsInteger(id)) {
      return res.status(400).json({ error: 'id param must be a integer' });
    }

    return next();
  },
  async delete(req, res, next) {
    const { id } = req.params;

    if (!stringIsInteger(id)) {
      return res.status(400).json({ error: 'id param must be a integer' });
    }
    const schema = yup.object().shape({
      id: yup.number(),
    });

    if (!(await schema.isValid({ id: 1 }))) {
      return res.status(400).json({ error: 'validations fails' });
    }
    return next();
  },
};

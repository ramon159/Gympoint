import * as yup from 'yup';

const stringIsInteger = (value) =>
  // eslint-disable-next-line no-restricted-globals
  !isNaN(value) && Number.isInteger(Number(value)); // use regex?

const validationsFails = (res) =>
  res.status(400).json({ error: 'validations fails' });

export default {
  index(req, res, next) {
    const { page } = req.query;
    if (page && !stringIsInteger(page)) {
      return res.status(400).json({ error: '?page=<value> is not an integer' });
    }

    return next();
  },
  store(req, res, next) {
    const schema = yup.object().shape({
      student_id: yup.integer().required(),
      plan_id: yup.integer().required(),
      start_date: yup.date().required(),
    });
    return next();
  },
  update(req, res, next) {
    return next();
  },
  delete(req, res, next) {
    return next();
  },
};

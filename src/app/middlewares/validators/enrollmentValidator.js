const stringIsInteger = (value) =>
  // eslint-disable-next-line no-restricted-globals
  !isNaN(value) && Number.isInteger(Number(value)); // use regex?

export default {
  index(req, res, next) {
    const { page } = req.query;
    if (page && !stringIsInteger(page)) {
      return res.status(400).json({ error: '?page=<value> is not an integer' });
    }

    return next();
  },
  store(req, res, next) {
    return res.json();
  },
  update(req, res, next) {
    return res.json();
  },
  delete(req, res, next) {
    return res.json();
  },
};

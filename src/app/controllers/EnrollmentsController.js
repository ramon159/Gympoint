// import Enrollment from '../models/Enrollment';

export default {
  async index(req, res) {
    return res.json(req);
  },
  async store(req, res) {
    return res.json(req);
  },
  async update(req, res) {
    const { id } = req.params;
    return res.json(id);
  },
  async delete(req, res) {
    const { id } = req.params;
    return res.json(id);
  },
};

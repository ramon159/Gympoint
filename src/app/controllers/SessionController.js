import jwt from 'jsonwebtoken';
import { User } from '../models';
import authConfig from '../../config/auth';

export default {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const { id, name } = user;
    const token = jwt.sign({ id, name, email }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token });
  },
};

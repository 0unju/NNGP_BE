import models from '../../models/index.js';
import bcrypt from 'bcrypt';

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    const users = await models.User.findAll({
      where: { id: id }
    });

    if (users.length !== 0) {
      res.status(401).send('UNAUTHORIZED');
    } else {
      if (password) {
        const check = await bcrypt.compare(password, users[0].password);
        if (!check) {
          res.status(400).send('INVALID_PASSWORD');
        } else {
          users[0].update({ useStatus: 0 });
          res.status(200).send('USER_DELETED');
        }
      } else {
        res.status(400).send('PASSWORD_NOT_ENTERED');
      }
    }
  } catch (err) {
    req.message = 'DELETE_USER';
    next(err);
  }
};

export default deleteUser;
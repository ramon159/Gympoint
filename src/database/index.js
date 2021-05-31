import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import * as models from '../app/models';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    Object.entries(models)
      .map((model) => model[1].init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

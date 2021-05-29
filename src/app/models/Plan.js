import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.REAL,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'plans',
        underscored: true,
      }
    );
    return this;
  }
}
export default Plan;

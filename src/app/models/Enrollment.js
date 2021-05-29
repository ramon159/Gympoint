import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: {
          type: Sequelize.DATE, // pelo usuario
          allowNull: false,
        },
        end_date: {
          // gerada
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          // gerada
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'enrollments',
        underscored: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
  // associate student_id, plan_id
}
export default Enrollment;

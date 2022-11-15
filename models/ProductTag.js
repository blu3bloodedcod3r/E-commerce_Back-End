const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {
};

FOREIGN_KEY_CHECKS = 0;

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id:  {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onUpdate: 'CASCADE', 
       references: {
        model: 'Product',
        key: 'id'
      }
    },
    tag_id:  {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      references: {
        model: 'Tag',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ProductTag',
  }
);

module.exports = ProductTag;

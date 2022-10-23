import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/db.config'
import { userModel } from './users.model'
import { productModel } from './products.model'
import { cartModel } from './cart.model'

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.user as string,
  dbConfig.password,
  {
    host: dbConfig.host,
    models: [productModel, userModel, cartModel],
    dialect: dbConfig.dialect as Dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)

const db = {
  Sequelize,
  sequelize
}

userModel.hasMany(productModel, { foreignKey: 'User_ID' })
productModel.belongsTo(userModel, { foreignKey: 'User_ID' })
userModel.hasMany(cartModel, { foreignKey: 'User_ID' })
cartModel.belongsTo(userModel, { foreignKey: 'User_ID' })
productModel.hasMany(cartModel, { foreignKey: 'Product_ID' })
cartModel.belongsTo(productModel, { foreignKey: 'Product_ID' })

export default db

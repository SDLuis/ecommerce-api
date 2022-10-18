import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/db.config'
import { userModel } from './users.model'
import { productModel } from './products.model'

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.user as string,
  dbConfig.password,
  {
    host: dbConfig.host,
    models: [productModel, userModel],
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

export default db

import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export interface ICart {
  Cart_ID?: number
  Product_ID?: number
  Product_Name: string
  User_ID?: number
  price: number
  quantity: number
  img: string
  createdAt: Date
  updatedAt: Date
  userModel: object
}
export type cartEntry = ICart
export type NotSensistiveInfoCart = Omit<ICart, 'User_ID' | 'userModel'>
export type NewCartEntry = Omit<ICart, 'Cart_ID' | 'userModel' | 'createdAt' | 'updatedAt'>
export type cartEntryWithoutUserModel = Omit<ICart, 'userModel'>

@Table({
  tableName: 'cart',
  timestamps: true
})

export class cartModel extends Model implements cartEntryWithoutUserModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Cart_ID: number | undefined

  @Column({
    type: DataType.INTEGER
  })
    Product_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
    Product_Name!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    User_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    price!: number

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    quantity!: number

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000)
  })
    img!: string

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date

  @Column({
    type: DataType.DATE
  })
    updatedAt!: Date
}

import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export enum productType {
  headphone = 'Headphone',
  wiredheadphone = 'Wired Headphone',
  wirelessheadphone = 'Wireless Headphone'
}
export interface IProduct {
  Product_ID?: number
  Product_Name: string
  Product_Type: productType
  User_ID?: number
  price: number
  quantity: number
  img: string
  smallText: string
  midText: string
  largeText: string
  description: string
  createdAt: Date
  updatedAt: Date
  userModel: object
}

export type productEntry = IProduct
export type NotSensistiveInfoProducts = Omit<IProduct, 'User_ID' | 'userModel'>
export type NewProductEntry = Omit<IProduct, 'Product_ID' | 'userModel'>
export type IProductWithoutUserModel = Omit<IProduct, 'userModel'>

@Table({
  tableName: 'products',
  timestamps: true
})

export class productModel extends Model implements IProductWithoutUserModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    type: DataType.STRING(50)
  })
    Product_Type!: productType

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

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
    smallText!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
    midText!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
    largeText!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000)
  })
    description!: string

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date

  @Column({
    type: DataType.DATE
  })
    updatedAt!: Date
}

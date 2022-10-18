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
}

export type productEntry = IProduct
export type NotSensistiveInfoProducts = Omit<IProduct, 'User_ID'>
export type NewProductEntry = Omit<IProduct, 'Product_ID'>

@Table({
  tableName: 'products',
  timestamps: true
})

export class productModel extends Model implements IProduct {
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
}

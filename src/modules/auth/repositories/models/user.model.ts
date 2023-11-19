import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SessionModel } from './session.model';

interface IUserCreationAttributes {
  email: string;
  passwordHash: string;
}

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel, IUserCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash: string;

  @HasMany(() => SessionModel)
  sessions: SessionModel[];
}

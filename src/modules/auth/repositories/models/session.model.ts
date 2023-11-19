import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

interface ISessionCreationAttributes {
  browser: string;
  userId: string;
  createdAt: number;
}

@Table({ tableName: 'session' })
export class SessionModel extends Model<
  SessionModel,
  ISessionCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  browser: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    unique: false,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.BIGINT,
    unique: false,
    allowNull: false,
  })
  createdAt: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}

import { Entity, Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  @Column({ name: 'user_id' })
  user_id: string;

  @Column({ name: 'user_name', length: 32, unique: true })
  userName: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

//   @Column({ name: 'full_name', length: 255 })
//   fullName: string;

  @Column()
  activated: number;

  @Column({ name: 'is_admin'})
  isAdmin: number;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'first_name', nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  @Column({ name: 'email', unique: true, nullable: false })
  public email: string;
}

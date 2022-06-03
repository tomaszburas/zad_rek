import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { NewUserEntity, UserEntity, UserRecordResults } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/handle-errors';
import { validationPassword } from '../utils/validation-password';
import { validationEmail } from '../utils/validation-email';

export class UserRecord implements UserEntity {
  id: string;
  password: string;
  email: string;

  constructor(obj: NewUserEntity) {
    if (!obj.email || obj.email.length > 254) {
      throw new ValidationError('Email cannot be empty and cannot be longer than 254 characters.');
    }

    if (!validationEmail(obj.email)) {
      throw new ValidationError('Incorrect email.');
    }

    if (!obj.password || obj.password.length > 72) {
      throw new ValidationError('Password cannot be empty and longer than 72 characters.');
    }

    if (!validationPassword(obj.password)) {
      throw new ValidationError(
        'Password must contain min. 5 characters, one digit and one upper case character',
      );
    }

    this.id = obj.id;
    this.email = obj.email;
    this.password = obj.password;
  }

  async register() {
    if (!this.id) this.id = uuid();

    this.password = await bcrypt.hash(this.password, 10);

    await pool.execute('INSERT INTO `users` VALUES (:id, :email, :password)', {
      id: this.id,
      email: this.email,
      password: this.password,
    });
  }

  async login(): Promise<UserRecord> {
    const [user] = (await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
      email: this.email,
    })) as UserRecordResults;
    if (!user[0]) throw new ValidationError('User not found');

    const passwordMatch = await bcrypt.compare(this.password, user[0].password);
    if (!passwordMatch) throw new ValidationError('Password not valid');

    return new UserRecord(user[0]);
  }

  static async getById(id: string): Promise<UserRecord | null> {
    const [user] = (await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    })) as UserRecordResults;

    return user.length ? new UserRecord(user[0]) : null;
  }
}

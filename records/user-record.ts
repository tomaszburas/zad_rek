import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { NewUserEntity, UserEntity, UserRecordResults } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/handle-errors';
import { validationPassword } from '../utils/validation-password';

export class UserRecord implements UserEntity {
    id: string;
    password: string;
    username: string;

    constructor(obj: NewUserEntity) {
        if (!obj.username || obj.username.length > 25) {
            throw new ValidationError('Username cannot be empty and cannot be longer than 25 characters.');
        }

        if (!obj.password) {
            throw new ValidationError('Password cannot be empty.');
        }

        if (!validationPassword(obj.password)) {
            throw new ValidationError(
                'Password must contain min. 5 characters, one digit and one upper case character'
            );
        }

        this.id = obj.id;
        this.username = obj.username;
        this.password = obj.password;
    }

    async register() {
        if (!this.id) this.id = uuid();

        this.password = await bcrypt.hash(this.password, 10);

        await pool.execute('INSERT INTO `users` VALUES (:id, :username, :password)', {
            id: this.id,
            username: this.username,
            password: this.password,
        });
    }

    async login(): Promise<UserRecord> {
        const [user] = (await pool.execute('SELECT * FROM `users` WHERE `username` = :username', {
            username: this.username,
        })) as UserRecordResults;
        if (!user[0]) throw new ValidationError('User not found');

        const passwordMatch = await bcrypt.compare(this.password, user[0].password);
        if (!passwordMatch) throw new ValidationError('Password not valid');

        return new UserRecord(user[0]);
    }

    static async getById(id: string): Promise<UserRecord | null> {
        const [user] = (await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
            id: id,
        })) as UserRecordResults;

        return user.length ? new UserRecord(user[0]) : null;
    }
}

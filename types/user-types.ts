import { FieldPacket } from 'mysql2';

export interface UserEntity {
    id: string;
    email: string;
    password: string;
}

export interface NewUserEntity extends Omit<UserEntity, 'id'> {
    id?: string;
}

export type UserRecordResults = [UserEntity[], FieldPacket[]];

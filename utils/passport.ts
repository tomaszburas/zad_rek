import { Request } from 'express';
import passportJwt from 'passport-jwt';
import passport from 'passport';
import { UserEntity } from '../types';
import { ACCESS_TOKEN } from '../config';
import { UserRecord } from '../records/user-record';

declare module 'express' {
    export interface Request {
        user: UserEntity;
    }
}

interface Options {
    jwtFromRequest: (req: Request) => string | null;
    secretOrKey: string;
}

const cookieExtractor = (req: Request): string | null => {
    let token = null;
    if (req && req.cookies) token = req.cookies['access_token'];
    return token;
};

const JwtStrategy = passportJwt.Strategy;

const opts: Options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: ACCESS_TOKEN,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await UserRecord.getById(jwt_payload.id);
        user ? done(null, user) : done(null, false);
    })
);

import * as express from 'express';
import Passport from 'passport';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { IVerifyOptions } from 'passport-local';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["use"] }] */
export class PassportMiddleware implements ExpressMiddlewareInterface {
    public use(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<Passport.Authenticator> {
        return Passport.authenticate('local', (err, user, info: IVerifyOptions) => {
            if (err || !user) {
                console.error(err, user);
                return res.status(401).send({ message: 'Login failed' });
            }

            req.user = user;
            return req.logIn(user, error => {
                if (error) {
                    return next(error);
                }
                if (req.session) {
                    //do not set user as it is, it may contain some sensitive information
                    req.session.user = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        groupId: user.groupId,
                        email: user.email,
                    };
                    req.session.save();
                }

                return next();
            });
        })(req, res, next);
    }
}

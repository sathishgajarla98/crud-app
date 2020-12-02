import Passport from 'passport';
import PassportLocal, { IVerifyOptions } from 'passport-local';
import { Service, Inject } from 'typedi';

import { UserService } from './user.service';

@Service()
export class PassportConfig {
    @Inject()
    private userService: UserService;

    public setup() {
        Passport.serializeUser((user: { id: number }, done) => {
            done(null, { id: user.id });
        });

        Passport.deserializeUser(async (obj: { id: number }, done) => {
            console.log('deserial id', obj);
            return this.userService
                .getUserById(obj.id)
                .then(user => {
                    done(null, { ...user });
                })
                .catch(err => {
                    done(err);
                });
        });

        /**
         * Sign in using Email and Password.
         * Here different times of users will have different keys for username and password
         */
        Passport.use(
            new PassportLocal.Strategy(
                {
                    passReqToCallback: true,
                    passwordField: 'password',
                    usernameField: 'username',
                },
                // eslint-disable-next-line unused-imports/no-unused-vars-ts
                async (req, username, password, done) => {
                    try {
                        console.log('credentials', username, password);
                        let infoMessage: string | undefined = '';

                        const loginResult = await this.userService.login(req);
                        if (loginResult.status) {
                            return done(null, loginResult.data);
                        }
                        infoMessage = loginResult.message;

                        if (!infoMessage) {
                            infoMessage = '';
                        }
                        const options: IVerifyOptions = {
                            message: infoMessage,
                        };
                        return done(null, false, options);
                    } catch (err) {
                        return done(err);
                    }
                },
            ),
        );
    }
}

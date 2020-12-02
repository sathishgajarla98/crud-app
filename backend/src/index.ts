import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';

import { Container, Service } from 'typedi';
import { useContainer as useOrmContainer, ConnectionOptions, createConnection } from 'typeorm';
import { useContainer, useExpressServer } from 'routing-controllers';
import Helmet from 'helmet';
import Express from 'express';

import { Config, OrmConfig } from './config';

import * as controllers from './controllers';
import { CommonUtils } from './utils';
import { PassportConfig } from './services';

const app: Express.Application = Express();

const start = async () => {
    app.use(Helmet());
    app.use(morgan('combined'));
    app.use(cookieParser(Config.secret));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(bodyParser.json({ limit: '50mb' }));

    const ms = 1000;
    const expiryInMs = 3600 * ms;

    var MemoryStore = session.MemoryStore;
    app.use(
        session({
            cookie: {
                httpOnly: true,
                maxAge: expiryInMs,
                secure: app.get('env') === 'production',
            },
            resave: false,
            saveUninitialized: true,
            store: new MemoryStore(),
            secret: Config.secret,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    useContainer(Container);

    useExpressServer(app, {
        controllers: <Function[]>CommonUtils.getObjectValues(controllers),
        cors: {
            allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
            exposeHeaders: ['X-Request-Id'],
            origin: 'http://localhost:3000',
            credentials: true,
        },
        defaultErrorHandler: false,
        defaults: {
            nullResultCode: 404,
            paramOptions: {
                required: false,
            },
            undefinedResultCode: 404,
        },
        middlewares: [],
        routePrefix: '/api',
    });
    useOrmContainer(Container);
    const connection = await createConnection(OrmConfig as ConnectionOptions);
    // const result = await connection.runMigrations();
    // if (result.length) {
    //     console.info('migration results', result);
    // }

    const passportConfig = Container.get(PassportConfig);
    passportConfig.setup();

    app.listen(Config.port, () => {
        console.log(`server started on port ${Config.port}`);
    });
};

process.on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection', promise);
    console.warn('Rejection Reason', reason);
});

start();

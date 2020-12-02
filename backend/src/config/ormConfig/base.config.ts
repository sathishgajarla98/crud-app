import { CommonUtils } from '../../utils';
import { IOrmConfig } from '../../interfaces';

import { config as loadEnvConfig } from 'dotenv';

import * as entities from '../../orm/entities';
// import * as migrations from '../../orm/migrations';

loadEnvConfig();

export abstract class BaseConfig implements IOrmConfig {
    type: string = process.env.DB_TYPE || '';

    host: string = process.env.DB_HOST || '';

    port: number = parseInt(process.env.DB_PORT || '0', 10);

    username: string = process.env.DB_USERNAME || '';

    password: string = process.env.DB_PASSWORD || '';

    database: string = process.env.DB_DATABASE || '';

    public entities: Function[] = <Function[]>CommonUtils.getObjectValues(entities);

    migrations: Function[] = [];

    synchronize: boolean;
}

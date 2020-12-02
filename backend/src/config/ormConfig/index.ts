import { config as loadEnvConfig } from 'dotenv';

import { development } from './development.config';
import { production } from './production.config';
import { staging } from './staging.config';
import { test } from './test.config';
import { BaseConfig } from './base.config';

loadEnvConfig();

let env: string = process.env.NODE_ENV || 'development';

const configs: { [key: string]: BaseConfig } = {
    development,
    production,
    staging,
    test,
};

if (!configs[env]) {
    console.error(`ORM Configuration not found for ${env}, forcing to use development`);
    env = 'development';
}

export const OrmConfig = configs[env];

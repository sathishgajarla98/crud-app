import { config as loadEnvConfig } from 'dotenv';

import { development } from './development.config';
import { production } from './production.config';
import { staging } from './staging.config';

loadEnvConfig();

let env: string = process.env.NODE_ENV || 'development';

const configs: any = {
    development,
    production,
    staging,
};

if (!configs[env]) {
    console.error(`Configuration not found for ${env}, forcing to use development`);
    env = 'development';
}

export const Config = configs[env];

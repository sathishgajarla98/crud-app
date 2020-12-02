// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';

loadEnvConfig();

export abstract class BaseConfig {
    host: string = process.env.APP_HOST || 'localhost';

    port: number = parseInt(process.env.APP_PORT || '0', 10);

    secret: string = process.env.SECRET || 'secret';
}

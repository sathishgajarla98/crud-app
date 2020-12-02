import { BaseConfig } from './base.config';

class Production extends BaseConfig {
    synchronize = false;
}

export const production = new Production();

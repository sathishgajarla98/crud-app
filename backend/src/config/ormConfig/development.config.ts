import { BaseConfig } from './base.config';

class Development extends BaseConfig {
    synchronize = true;
}

export const development = new Development();

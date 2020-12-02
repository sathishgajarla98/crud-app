import { BaseConfig } from './base.config';

class Staging extends BaseConfig {
    synchronize = false;
}

export const staging = new Staging();

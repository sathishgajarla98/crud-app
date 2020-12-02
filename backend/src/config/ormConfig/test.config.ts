import { BaseConfig } from './base.config';

class Test extends BaseConfig {
    synchronize = true;
}

export const test = new Test();

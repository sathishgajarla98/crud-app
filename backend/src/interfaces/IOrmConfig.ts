export interface IOrmConfig {
    type: string;

    host: string;

    port: number;

    username: string;

    password: string;

    database: string;

    entities: Function[];

    migrations: Function[];

    synchronize: boolean;
}

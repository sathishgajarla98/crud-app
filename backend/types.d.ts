export {};
declare global {
    namespace Express {
        export interface Request {
            session: {};
        }
        export interface Session {
            user?: {};
        }
    }
}

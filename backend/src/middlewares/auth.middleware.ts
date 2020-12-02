import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response } from 'express';

export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    private errorMessage: string = 'Unauthorized access';

    /**
     * Checks if the token present in the request cookies and
     * if the token is valid then appends the user object to request
     *
     * @param request - This is the request object
     * @param response - This is the response object
     * @param next - This is function to move forward
     */
    public async use(
        request: Request,
        response: Response,
        next: (err?: Error) => Promise<Express.Response>,
    ): Promise<Express.Response> {
        console.log(request.session);
        if (!request.session || !request.session.user) {
            return response.status(401).send({ message: this.errorMessage });
        }
        if (!this.isAuthenticated(request)) {
            return response.status(401).send({ message: this.errorMessage });
        }
        const { user } = request.session;
        request.user = user;
        return next();
    }

    public isAuthenticated(request: Request): boolean {
        if (!request.isAuthenticated()) {
            return false;
        }

        if (!request.session || !request.session.user) {
            return false;
        }
        return true;
    }
}

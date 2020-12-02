import { JsonController, Post, Res, Req, UseBefore } from 'routing-controllers';

import { Inject, Service } from 'typedi';
import { Request, Response } from 'express';

import { UserService } from '../services';
import { PassportMiddleware } from '../middlewares';

@Service()
@JsonController('/auth')
export class AuthController {
    @Inject()
    private userService: UserService;

    /**
     * Login API method
     *
     * @param req - This is the request object
     * @param res - This is the response object
     *
     * @returns response
     */
    @Post('/local')
    @UseBefore(PassportMiddleware)
    public async loginHandler(@Req() req: Request, @Res() res: Response): Promise<{}> {
        try {
            if (req.session) {
                req.session.key = req.body.username;
            }

            const result = await this.userService.loginHandler(req);
            return res.status(200).send({ data: result.data });
        } catch (err) {
            console.error(`Error in login api ${err.stack}`);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }

    @Post('/logout')
    public async logout(@Req() req: Request, @Res() res: Response): Promise<{}> {
        if (req.user) {
            if (req.session) {
                req.session.destroy(() => {});
            }
        } else console.warn('User object not found in logout request');

        return res.status(200).send();
    }
}

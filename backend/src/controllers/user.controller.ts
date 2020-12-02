import { JsonController, Req, UseBefore, Res, Get, Param, Post, Delete } from 'routing-controllers';

import { Inject } from 'typedi';
import { Request, Response } from 'express';
import { UserService } from '../services';
import { AuthenticationMiddleware } from '../middlewares';

@JsonController('/users')
export class UserController {
    @Inject()
    private userService: UserService;
    /**
     * Fetches the lab details
     *
     * @param req - Express request object
     * @param res - Express response object
     *
     * @returns users details
     */
    @Get('/')
    @UseBefore(AuthenticationMiddleware)
    public async getUsers(@Req() req: Request, @Res() res: Response): Promise<{}> {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        const { user } = req;
        const users = await this.userService.getAllUsers();
        return res.status(200).send({ data: users.filter(u => u.id !== user.id) });
    }

    /**
     * Fetches the lab details
     *
     * @param req - Express request object
     * @param res - Express response object
     *
     * @returns users details
     */
    @Post('/')
    @UseBefore(AuthenticationMiddleware)
    public async addUser(@Req() req: Request, @Res() res: Response): Promise<{}> {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        //check if user has permissions to add new user
        const { user } = req;
        const permissions = await this.userService.getUserPermissions(user);
        if (!permissions || !permissions.create) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        const result = await this.userService.addUser(req.body);
        if (!result.status) {
            return res.status(500).send({ message: result.message });
        }
    }

    /**
     * Fetches the lab details
     *
     * @param req - Express request object
     * @param res - Express response object
     *
     * @returns users details
     */
    @Post('/update')
    @UseBefore(AuthenticationMiddleware)
    public async updateUser(@Req() req: Request, @Res() res: Response): Promise<{}> {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        //check if user has permissions to udpate users
        const { user } = req;
        const permissions = await this.userService.getUserPermissions(user);
        if (!permissions || !permissions.edit) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        const result = await this.userService.updateUser(req.body);
        if (!result.status) {
            return res.status(500).send({ message: result.message });
        }
        return res.status(200).send({ data: {} });
    }

    @Delete('/:id')
    @UseBefore(AuthenticationMiddleware)
    public async archiveUser(@Req() req: Request, @Res() res: Response): Promise<{}> {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        //check if user has permissions to archive
        const { user } = req;
        const permissions = await this.userService.getUserPermissions(user);
        if (!permissions || !permissions.delete) {
            return res.status(401).send({ message: 'Unauthorized access!' });
        }
        const result = await this.userService.archiveUser(req.body.id);
        if (!result.status) {
            return res.status(500).send({ message: result.message });
        }
        return res.status(200).send({ data: {} });
    }
}

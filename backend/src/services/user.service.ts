import { group } from 'console';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Permissions, User, UserGroup } from '../orm/entities';
import { UserGroupEnum } from '../enums';

@Service()
export class UserService {
    @InjectRepository(User)
    private userRepo: Repository<User>;

    @InjectRepository(Permissions)
    private permissionsRepo: Repository<Permissions>;

    @InjectRepository(UserGroup)
    private userGroupRepo: Repository<UserGroup>;

    public async loginHandler(req: any): Promise<{ status: boolean; data?: {} }> {
        const { user } = req;
        const userDetails = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            permissions: {},
        };
        if (user.groupId) {
            const permissions = await this.permissionsRepo.findOne({ where: { groupId: user.groupId } });
            if (permissions) {
                userDetails.permissions = {
                    ...permissions,
                };
            }
        }
        return {
            status: true,
            data: userDetails,
        };
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepo.find({});
    }

    public async saveUser(user): Promise<User> {
        return this.userRepo.save(user);
    }

    public async login(req): Promise<{ status: boolean; message?: string; data?: {} }> {
        const { username, password } = req.body;

        const message: string = 'Invalid credentials';
        const user = await this.userRepo.findOne({ where: { email: username } });
        //temporary check
        //password encryption is not implemented yet
        if (user && password === 'password123') {
            req.user = user;
            return {
                status: true,
                data: user,
            };
        }
        return {
            status: false,
            message,
        };
    }

    public async getUserById(id: number): Promise<User | undefined> {
        return this.userRepo.findOne({ where: { id } });
    }

    public async getUserPermissions(user: any): Promise<Permissions | undefined> {
        const { groupId } = user;
        if (groupId) {
            return this.permissionsRepo.findOne({ where: { groupId } });
        }
        return undefined;
    }

    public async updateUser(userObj: any): Promise<{ status: boolean; message?: string }> {
        const { id, firstName, lastName } = userObj;
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            return { status: false, message: 'User not found' };
        }
        user.firstName = firstName;
        user.lastName = lastName;
        await this.userRepo.save(user);
        return { status: true };
    }

    public async archiveUser(id: number): Promise<{ status: boolean; message?: string }> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            return { status: false, message: 'User not found' };
        }
        user.isActive = false;
        await this.userRepo.save(user);
        return { status: true };
    }

    public async addUser(userObj: any): Promise<{ status: boolean; message?: string }> {
        const { email } = userObj;
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) {
            return {
                status: false,
                message: 'User exists with email',
            };
        }
        const group = await this.userGroupRepo.findOne({ where: { name: UserGroupEnum.user } });
        if (!group) {
            return {
                status: false,
                message: 'User group does not exists',
            };
        }
        const user = new User();
        user.email = email;
        user.firstName = userObj.firstName;
        user.lastName = userObj.lastName;
        user.isActive = true;
        user.groupId = group.id;
        await this.userRepo.save(user);
        return { status: true };
    }
}

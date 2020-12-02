import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';

@Service()
export class CryptoUtils {
    public static encryptPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public static comparePassword(plainPassword: string, hash: string): boolean {
        return bcrypt.compareSync(plainPassword, hash);
    }
}

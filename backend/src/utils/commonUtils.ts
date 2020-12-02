export class CommonUtils {
    /**
     * Validates the given input is in email format or not
     *
     * @param email - This is the email to be validated
     *
     * @returns boolean
     */
    public static validateEmail(email: string): boolean {
        // eslint-disable-next-line
        const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Validates the given input is a valid URL format or not
     *
     * @param url - This is the urk to be validated
     *
     * @returns boolean
     */
    public static validateUrl(url: string): boolean {
        // eslint-disable-next-line
        const re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
        return re.test(url);
    }

    /**
     * Returns the email domain linked from the email
     *
     * @param email - This is the email
     *
     * @returns email domain string
     */
    public static getEmailDomain(email: string): string {
        if (!CommonUtils.validateEmail(email)) throw new Error('Email is not valid');
        return email.substring(email.lastIndexOf('@') + 1);
    }

    /**
     * Returns the array of values
     *
     * @param Obj - It has multiple key - value pairs
     */
    public static getObjectValues<T>(obj: { [key: string]: T }): T[] {
        return Object.keys(obj).map(key => obj[key]);
    }
}

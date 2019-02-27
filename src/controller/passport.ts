import { userInfoModel } from "../model/userInfo";
import * as Mongoose from 'mongoose';

class passport {
    /**
     * login
     * @param username
     * @param password
     */
    static async login (username: string, password: string): Promise<string> {
        let promise = new Promise<string>((resolve, reject) => {
            resolve("test");
        });
        return promise;
    };

}

export { passport }
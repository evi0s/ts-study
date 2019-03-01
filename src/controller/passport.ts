import { userInfoModel } from "../model/userInfo";
import { Connection } from "../tools/mongo";
import { debug } from "../tools/debug";


class Passport {
    private Connection: any = null;

    constructor () {
       Connection.getInstance()
           .then((connection) => {
               this.Connection = connection;
           })
           .catch((err) => {
            debug(err.message);
            throw err;
        });
    }

    async getConnection () {
        if (this.Connection) {
            await this.Connection;
        } else {
            return null;
        }
        return this.Connection;
    }

    /**
     * login
     * @param username
     * @param password
     */
    login = async function (username: string, password: string) {
        await this.getConnection();

        let result;
        try {
            result = await userInfoModel.find(
                {
                    "username": username,
                    "password": password
                });
        } catch (err) {
            throw err;
        }

        if (result.length != 1) {
            throw new Error('Error in login!');
        }
        return result[0]._id;
    }
}

export { Passport }
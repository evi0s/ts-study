import * as Mongoose from 'mongoose';

class userInfoModel {
    username: string;
    password: string;
    email: string;
    avatar: string;
    nickname: string;
    role: string;
    blogs: Array<Mongoose.Types.ObjectId>;
    pages: Array<Mongoose.Types.ObjectId>;
    comments: Array<Mongoose.Types.ObjectId>;


    constructor(_username: string, _password: string,
                _email: string, _avatar: string,
                _nickname: string, _role: string) {
        this.username = _username;
        this.password = _password;
        this.email = _email;
        this.avatar = _avatar;
        this.nickname = _nickname;
        this.role = _role;
    }
}

export { userInfoModel }
import * as Mongoose from 'mongoose';


let userInfoSchema = new Mongoose.Schema({
    username: String,
    password: String,
    email   : String,
    avatar  : String,
    nickname: String,
    role    : String,
    blogs   : Array,
    pages   : Array,
    comments: Array
});

let userInfoModel = Mongoose.model('userInfo', userInfoSchema);

export { userInfoModel }

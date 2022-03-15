import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Model } from 'mongoose';
import { ROLE } from "src/enums/role.enum";
import { User, UserDocument } from "src/types/user.type";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    getUser = (useridentity: string) =>
        this.userModel.findOne({
            $or: [{ username: useridentity }, { email: useridentity }],
        });

    getUsers = (role: ROLE) => this.userModel.find({ role: { $gt: role } });

    updateUser = (userid: string, user: User) => this.userModel.findByIdAndUpdate(new ObjectId(userid), user);

    createUser = (payload: User) => {
        const user = new this.userModel(payload);
        return user.save();
    };

}
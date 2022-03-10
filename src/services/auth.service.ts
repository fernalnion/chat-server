import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/types/user.type';
import { Model } from 'mongoose';
import { Login } from 'src/types/login.type';
import { hash } from 'bcrypt';
import { ROLE } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  signUp = async (payload: User): Promise<void> => {
    const user = new this.userModel(payload);
    await user.save();
  };

  getUser = (useridentity: string) =>
    this.userModel.findOne({
      $or: [{ username: useridentity }, { email: useridentity }],
    });

  getUsers = (role: ROLE) => this.userModel.find({ role: { $gt: role } });

  //   signIn(payload: Login) {
  //     const user = await this.userModel.findOne({
  //       $or: [
  //         { username: payload.useridentity },
  //         { email: payload.useridentity },
  //       ],
  //     });

  //     if (!user) {
  //       throw new BadRequestException('Username/Email not registered with us');
  //     }

  //     const hashedPassword = await hash(payload.password, 10);
  //     if (user.password !== hashedPassword) {
  //       throw new BadRequestException('Invalid user details');
  //     }

  //     if (!user.active) {
  //       throw new BadRequestException(
  //         'Account has been disabled, Contact your administrator',
  //       );
  //     }
  //   }
}

import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ROLE } from 'src/enums/role.enum';
import { User, UserDocument } from 'src/types/user.type';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  signUp = async (payload: User): Promise<void> => {
    await this.userService.createUser(payload);
  };

  validateUser = async (useridentity: string, password: string) => {
    const user = await this.userService.getUser(useridentity);
    const valid = await compare(password, user?.password);
    if (user && valid) {
      return user;
    }
    return null;
  };
}

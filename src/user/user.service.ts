import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserBusiness } from 'src/business/user.business';
import { ILogin } from 'src/types/login';
import { IPayload } from 'src/types/payload';
import { IUserBase } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(private userBusiness: UserBusiness) {}

  create = async (payload: IUserBase) => {
    const user = await this.userBusiness.getUser(payload);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    console.log(payload);
    const doc = await this.userBusiness.create(payload);
    return doc;
  };

  getUser = async (payload: IPayload) => {
    const user = await this.userBusiness.getUser(payload);
    return this.userBusiness.sanitizeUser(user);
  };

  login = async (loginDTO: ILogin) => {
    const { email, password } = loginDTO;

    const user = await this.userBusiness.getUser({ email });
    if (!user) {
      throw new HttpException("user doesn't exists", HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return { id: user._id, user: this.userBusiness.sanitizeUser(user) };
    }

    throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
  };
}

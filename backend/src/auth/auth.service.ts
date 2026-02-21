import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== dto.password) {
      throw new UnauthorizedException();
    }
    if (user.isActive === false) {
      throw new ForbiddenException();
    }
    return {
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    };
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

const SEED_USERS = [
  { username: 'demo', password: '123456' },
  { username: 'adir', password: '123456' },
];

@Injectable()
export class UsersSeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    for (const u of SEED_USERS) {
      const exists = await this.userModel.exists({ username: u.username });
      if (!exists) {
        await this.userModel.create(u);
      }
    }
  }
}

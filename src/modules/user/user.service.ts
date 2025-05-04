import {
  Body,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/shemas/user.schema';
import { LoginUserDto } from 'src/validators/loginUser';
import { RegisterUserDto } from 'src/validators/registerUser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    let user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new ForbiddenException('Incrorrect username or password');

    const token = jwt.sign(
      email,
      this.configService.getOrThrow<string>('SECRET'),
    );
    return { token };
  }

  async register(dto: RegisterUserDto) {
    const { email, password, fullName, age, mobileNumber } = dto;
    let user = await this.userModel.findOne({ email });
    if (user) throw new ConflictException('Email already exist');

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await this.userModel.create({
      email,
      password: hashedPassword,
      fullName,
      age,
      mobileNumber,
    });
    const { password: _, ...rest } = user.toJSON();
    return rest;
  }

  async profile(email: string) {
    let user = await this.userModel
      .findOne({ email }, { _id: 0, __v: 0, password: 0 })
      .lean();

    return { profile: user };
  }

  async allUsers(email: string) {
    let users = await this.userModel.find(
      {
        email: { $not: { $eq: email } },
      },
      { _id: 0, __v: 0, password: 0 },
    );
    return users;
  }
}

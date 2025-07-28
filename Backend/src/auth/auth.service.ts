import {
  UnauthorizedException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { comparePasswordHelper, hashPasswordHelper } from '@/helpers/util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async register(dto: RegisterDto) {
    const { email, password } = dto;
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Email already registered');

    const hashed: string = await hashPasswordHelper(password);
    await this.userModel.create({
      email,
      password: hashed,
    });
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await comparePasswordHelper(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}

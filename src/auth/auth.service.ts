import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { Role } from "../roles/entities/role.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    const defaultRole = await this.roleRepository.findOneBy({slug: 'user'});

    const user = this.userRepository.create({
      email,
      passwordHash,
      roles: [defaultRole],
    });
    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles']
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.slug),
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken };
  }

  async validateUser(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: ['roles'] })
  }
}
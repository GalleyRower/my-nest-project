import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  async createProfile(user: User) {
    const profile = this.userProfileRepository.create({user});
    return this.userProfileRepository.save(profile);
  }

  async getProfile(user: User): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({where: { user }, relations: ['user']});
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
    return profile
  }

  async updateProfile(user: User, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    const profile = await this.getProfile(user);
    await this.userProfileRepository.update(profile.id, updateUserProfileDto);
    return this.userProfileRepository.findOne({ where: { id: profile.id } });
  }

  async sendVerificationCode(user: User): Promise<void> {
    const profile = await this.getProfile(user);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Save code to profile (temporary - for demo purposes). in real app - better save to redis or database
    await this.userProfileRepository.update(profile.id, {email: profile.email, isVerifiedEmail: false});
    await this.mailerService.sendMail({
      to: profile.email,
      subject: 'Verification Code',
      text: `Your verification code: ${verificationCode}`,
    })
  }

  async verifyEmail(user: User, code: string): Promise<UserProfile> {
    const profile = await this.getProfile(user);
    // Check the saved code (temporary logic for demo purposes)
    if (code.length !== 6) {
      throw new Error('Wrong code');
    }
    await this.userProfileRepository.update(profile.id, { isVerifiedEmail: true });
    return this.userProfileRepository.findOne({where: { id: profile.id }});
  }
}
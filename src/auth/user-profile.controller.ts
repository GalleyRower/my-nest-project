import {
  Controller,
    Get,
    Patch,
    Body,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
    Post
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('User Profile')
@Controller('user/profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  @ApiOkResponse({ description: 'User profile' })
  getProfile(@Request() req) {
    return this.userProfileService.getProfile(req.user);
  }

  @Patch()
  @ApiOkResponse({ description: 'User profile updated' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateProfile(@Request() req, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfileService.updateProfile(req.user, updateUserProfileDto);
  }

  @Post('send-code')
  @ApiOkResponse({ description: 'Send verification code to email' })
  sendVerificationCode(@Request() req) {
    return this.userProfileService.sendVerificationCode(req.user);
  }

  @Post('verify-email')
  @ApiOkResponse({ description: 'Verify email code' })
  verifyEmail(@Request() req, @Body('code') code: string) {
    return this.userProfileService.verifyEmail(req.user, code);
  }
}
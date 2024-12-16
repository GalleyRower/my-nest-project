import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty({ example: 'Иван' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Иванов' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'Иванович' })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+79991234567' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({ example: 'male' })
  @IsString()
  @IsOptional()
  gender?: string;
}
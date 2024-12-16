import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUsersDto {
  @ApiProperty({ example: 'Иван' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+79991234567' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isVerifiedEmail?: boolean;
}

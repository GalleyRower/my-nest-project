import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiProperty({ example: 'Заявка на подключение' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Описание заявки' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+79991234567' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  @IsOptional()
  status?: string;
  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsOptional()
  categoryIds?: number[];
}
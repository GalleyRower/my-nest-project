import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 'Заявка на подключение' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Описание заявки' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+79991234567' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: [1, 2] })
  @IsArray()
  categoryIds: number[];
}
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'Заголовок блога' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Текст блога' })
  @IsString()
  @IsNotEmpty()
  text: string;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  categoryId: number;
}
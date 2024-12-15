import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiProperty({ example: 'Заголовок блога' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Текст блога' })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  categoryId?: number;
}
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemTypeDto {
  @ApiProperty({ example: 'Bebida' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;
}

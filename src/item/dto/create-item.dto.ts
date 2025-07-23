import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsUUID, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

/**
 * DTO para criação de um item.
 */
export class CreateItemDto {
  /**
   * Nome do item.
   * Deve ser uma string não vazia.
   */
  @ApiProperty({ example: 'João Almeida' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  /**
   * Preço do item.
   * Deve ser um número positivo.
   */
  @ApiProperty({ example: 100 })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  price: number;

  /**
   * ID do tipo de item.
   * Deve ser um UUID válido.
   */
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID('all', { message: 'O tipoItemId deve ser um UUID válido.' })
  itemTypeId: string;
}

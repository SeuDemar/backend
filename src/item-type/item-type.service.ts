import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@Injectable()
export class ItemTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateItemTypeDto) {
    return this.prisma.itemType.create({ data });
  }

  async findAll() {
    return this.prisma.itemType.findMany({
      include: {
        items: true, // traz os itens relacionados se quiser
      },
    });
  }

  async findOne(id: string) {
    const itemType = await this.prisma.itemType.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!itemType) {
      throw new NotFoundException('ItemType não encontrado');
    }

    return itemType;
  }

  async update(id: string, data: UpdateItemTypeDto) {
    // Verifica se existe antes de atualizar
    await this.findOne(id);

    return this.prisma.itemType.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // Verifica se existe antes de deletar
    await this.findOne(id);

    return this.prisma.itemType.delete({
      where: { id },
    });
  }
}

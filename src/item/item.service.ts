// item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateItemDto) {
    // Ensure all required fields are present
    const { name, price, itemTypeId } = data;
    return this.prisma.item.create({
      data: {
        name,
        price,
        itemTypeId,
        // Add other fields if needed, e.g. createdAt
      },
    });
  }

  async findAll() {
    return this.prisma.item.findMany({
      include: {
        itemType: true, // inclui os dados relacionados do itemType
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { itemType: true }, // corrigido para o nome correto da relação
    });

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return item;
  }

  async update(id: string, data: UpdateItemDto) {
    await this.findOne(id); // verifica existência

    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // verifica existência

    return this.prisma.item.delete({
      where: { id },
    });
  }
}

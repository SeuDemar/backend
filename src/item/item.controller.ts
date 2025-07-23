// item.controller.ts
import { Controller, Post, Get, Patch, Param, Body, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'Item criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de itens.' })
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Item encontrado.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'Item atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Item removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.remove(id);
  }
}

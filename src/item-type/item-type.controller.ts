// item-type.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@ApiTags('item-types')
@Controller('item-types')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  @ApiBody({ type: CreateItemTypeDto })
  @ApiResponse({ status: 201, description: 'ItemType criado com sucesso.' })
  async create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypeService.create(createItemTypeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de item types.' })
  async findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do ItemType', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'ItemType encontrado.' })
  @ApiResponse({ status: 404, description: 'ItemType não encontrado.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do ItemType', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateItemTypeDto })
  @ApiResponse({ status: 200, description: 'ItemType atualizado com sucesso.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypeService.update(id, updateItemTypeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do ItemType', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'ItemType removido com sucesso.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemTypeService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '../categories.service.js';
import { CreateCatDto } from '../dtos/create-cat.dto.js';
import { UpdateCatDto } from '../dtos/update-cat.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // private  /* der service ist nur in dieser class nutzbar */
  // readonly /* der Wert kann nach dem Constructor nicht mehr neu zugewiesen werden */

  @Get()
  findAllCategories() {
    const data = this.categoriesService.findAll();
    return data;
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    const data = this.categoriesService.findOneCat(id);
    return data;
  }

  @Post()
  createCategory(@Body() createCatDto: CreateCatDto) {
    return this.categoriesService.createCategory(createCatDto);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.categoriesService.updateCategory(id, updateCatDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

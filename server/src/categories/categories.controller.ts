import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { UpdateCatDto } from './dto/update-cat.dto.js';

@Controller('categories')
export class CategoriesController {
  // private  /* der service ist nur in dieser class nutzbar */
  // readonly /* der Wert kann nach dem Constructor nicht mehr neu zugewiesen werden */
  constructor(private readonly categoriesService: CategoriesService) {} // Dep Injection nets gibt dem controller eine fetrige instanz des service.

  @Get('fetch-categories')
  findAllCategories() {
    const data = this.categoriesService.findAll();
    return data;
  }
  @Get('fetch-one-category/:id')
  findOneCategory(@Param('id') id: string) {
    const data = this.categoriesService.findOneCat(id);
    return data;
  }
  @Post('create-category')
  createCategory(@Body() createCatDto: CreateCatDto) {
    return this.categoriesService.createCategory(createCatDto);
  }
  @Put('update-category/:id')
  updateCategory(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.categoriesService.updateCategory(id, updateCatDto);
  }
  @Delete('delete-category/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

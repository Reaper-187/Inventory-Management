import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';

@Controller('categories')
export class CategoriesController {
  // private  /* der service ist nur in dieser class nutzbar */
  // readonly /* der Wert kann nach dem Constructor nicht mehr neu zugewiesen werden */
  constructor(private readonly categoriesService: CategoriesService) {} // Dep Injection nets gibt dem controller eine fetrige instanz des service.

  @Get()
  findAllCategories() {
    const data = this.categoriesService.findAll();
    return data;
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [PrismaModule, CategoriesModule, SuppliersModule, ProductsModule],
})
export class AppModule {}

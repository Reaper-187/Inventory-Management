import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';
import { ProductsModule } from './products/products.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // nav auf den physischen Folder
      serveRoot: '/api/uploads', // unter welcher url-präfix die datei zu finden ist
    }),
    PrismaModule,
    CategoriesModule,
    SuppliersModule,
    ProductsModule,
  ],
})
export class AppModule {}

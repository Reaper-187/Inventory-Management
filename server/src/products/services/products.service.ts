import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto.js';
import { UpdateProductDto } from '../dtos/update-product.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma, Product } from '../../generated/prisma/client.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const prodInDb = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: true,
      },
    });
    if (!prodInDb) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return prodInDb;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with SKU '${createProductDto.sku}' already exists`,
          );
        }
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Invalid categoryId or supplierId: referenced entity does not exist',
          );
        }
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);

    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        include: {
          category: true,
          supplier: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with SKU '${updateProductDto.sku}' already exists`,
          );
        }
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Invalid categoryId or supplierId – referenced entity does not exist',
          );
        }
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Product> {
    await this.findOne(id);

    return await this.prisma.product.delete({
      where: { id },
    });
  }
}

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
import { buildSkuCandidate, buildSkuPrefix } from '../utils/sku.utils.js';
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import { QueryProductDto } from '../dtos/query-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryProductDto) {
    const { search, categoryId, supplierId, lowStock, page, limit } = query;

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (supplierId) {
      where.supplierId = supplierId;
    }

    if (!lowStock) {
      const [data, total] = await Promise.all([
        this.prisma.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          include: { category: true, supplier: true },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.product.count({ where }),
      ]);

      return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    }

    const allMatching = await this.prisma.product.findMany({
      where,
      include: { category: true, supplier: true },
      orderBy: { createdAt: 'desc' },
    });

    const lowStockProducts = allMatching.filter(
      (p) => p.currentStock <= p.minStock,
    );

    const total = lowStockProducts.length;
    const start = (page - 1) * limit;
    const data = lowStockProducts.slice(start, start + limit);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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

  private async generateUniqueSku(categoryId: string): Promise<string> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new BadRequestException(
        'Invalid categoryId: category does not exist',
      );
    }

    const prefix = buildSkuPrefix(category.name);

    let sku: string;
    let exists = true;

    do {
      sku = buildSkuCandidate(prefix);
      const existing = await this.prisma.product.findUnique({ where: { sku } });
      exists = !!existing;
    } while (exists);

    return sku;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const sku = await this.generateUniqueSku(createProductDto.categoryId);

    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
          sku,
        },
        include: {
          category: true,
          supplier: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with SKU '${sku}' already exists`,
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

    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
        supplier: true,
      },
    });
  }

  private async deleteImageFile(imageUrl: string): Promise<void> {
    const imagePath = join(process.cwd(), imageUrl);
    try {
      await unlink(imagePath);
    } catch (error) {
      console.warn(`Could not delete image at ${imagePath}:`, error);
    }
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const product = await this.findOne(id);

    if (product.imageUrl) await this.deleteImageFile(product.imageUrl);

    const imageUrl = `/uploads/products/${file.filename}`;

    return await this.prisma.product.update({
      where: { id },
      data: { imageUrl },
      include: {
        category: true,
        supplier: true,
      },
    });
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);

    if (product.imageUrl) await this.deleteImageFile(product.imageUrl);

    return await this.prisma.product.delete({
      where: { id },
    });
  }
}

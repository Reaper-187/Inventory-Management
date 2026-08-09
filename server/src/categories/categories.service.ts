import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Category } from '../generated/prisma/client.js';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { UpdateCatDto } from './dto/update-cat.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOneCat(id: string): Promise<Category> {
    const catInDB = await this.prisma.category.findUnique({ where: { id } });
    if (!catInDB) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return catInDB;
  }

  async createCategory(createBody: CreateCatDto): Promise<Category> {
    const name = createBody.name;
    const catExistAlready = await this.prisma.category.findFirst({
      where: { name },
    });

    if (catExistAlready) {
      throw new ConflictException(
        `Category with name "${name}" already exists`,
      );
    }

    return this.prisma.category.create({
      data: {
        name: createBody.name,
        description: createBody.description,
      },
    });
  }

  async updateCategory(
    id: string,
    updateBody: UpdateCatDto,
  ): Promise<Category> {
    const isCatInDB = await this.prisma.category.findUnique({ where: { id } });
    if (!isCatInDB) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateBody.name && updateBody.name !== isCatInDB.name) {
      const nameTaken = await this.prisma.category.findFirst({
        where: { name: updateBody.name },
      });
      if (nameTaken) {
        throw new ConflictException(
          `Category with name "${updateBody.name}" already exists`,
        );
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateBody.name,
        description: updateBody.description,
      },
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    const isCatInDB = await this.prisma.category.findUnique({ where: { id } });
    if (!isCatInDB) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.category.delete({ where: { id } });
  }
}

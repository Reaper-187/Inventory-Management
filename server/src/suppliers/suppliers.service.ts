import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Supplier } from '../generated/prisma/client.js';
import { CreateSuppDto } from './dto/createSupp.dto.js';
import { UpdateSuppDto } from './dto/updateSupp.dto.js';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSuppliers(): Promise<Supplier[]> {
    return await this.prisma.supplier.findMany();
  }

  async findOneSupplier(id: string): Promise<Supplier> {
    const suppInDB = await this.prisma.supplier.findUnique({ where: { id } });
    if (!suppInDB) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return suppInDB;
  }

  async createSupplier(createBody: CreateSuppDto): Promise<Supplier> {
    const name = createBody.name;
    const suppExistAlready = await this.prisma.supplier.findFirst({
      where: { name },
    });

    if (suppExistAlready) {
      throw new ConflictException(
        `Supplier with that name "${name}" already exists`,
      );
    }

    return this.prisma.supplier.create({
      data: {
        name: createBody.name,
        email: createBody.email,
        address: createBody.address,
        contactPerson: createBody.contactPerson,
        phone: createBody.phone,
      },
    });
  }

  async updateSupplier(
    id: string,
    updateBody: UpdateSuppDto,
  ): Promise<Supplier> {
    const isSuppInDB = await this.prisma.supplier.findUnique({ where: { id } });
    if (!isSuppInDB) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    if (updateBody.name && updateBody.name !== isSuppInDB.name) {
      const nameTaken = await this.prisma.supplier.findFirst({
        where: { name: updateBody.name },
      });
      if (nameTaken) {
        throw new ConflictException(
          `Supplier with name "${updateBody.name}" already exists`,
        );
      }
    }

    return this.prisma.supplier.update({
      where: { id },
      data: {
        name: updateBody.name,
        email: updateBody.email,
        address: updateBody.address,
        contactPerson: updateBody.contactPerson,
        phone: updateBody.phone,
      },
    });
  }

  async deleteSupplier(id: string): Promise<Supplier> {
    const isSuppInDB = await this.prisma.supplier.findUnique({ where: { id } });
    if (!isSuppInDB) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return this.prisma.supplier.delete({ where: { id } });
  }
}

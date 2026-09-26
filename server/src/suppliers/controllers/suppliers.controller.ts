import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SuppliersService } from '../services/suppliers.service.js';
import { CreateSuppDto } from '../dtos/createSupp.dto.js';
import { UpdateSuppDto } from '../dtos/updateSupp.dto.js';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Get()
  fetchAllSuppliers() {
    const data = this.supplierService.getAllSuppliers();
    return data;
  }

  @Get(':id')
  findOneSupplier(@Param('id') id: string) {
    const data = this.supplierService.findOneSupplier(id);
    return data;
  }
  @Post()
  createSupplier(@Body() createSuppDto: CreateSuppDto) {
    return this.supplierService.createSupplier(createSuppDto);
  }
  @Patch(':id')
  updateSupplier(
    @Param('id') id: string,
    @Body() updateSuppDto: UpdateSuppDto,
  ) {
    return this.supplierService.updateSupplier(id, updateSuppDto);
  }
  @Delete(':id')
  deleteSupplier(@Param('id') id: string) {
    return this.supplierService.deleteSupplier(id);
  }
}

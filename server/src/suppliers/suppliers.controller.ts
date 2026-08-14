import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service.js';
import { CreateSuppDto } from './dto/createSupp.dto.js';
import { UpdateSuppDto } from './dto/updateSupp.dto.js';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Get('fetch-suppliers')
  fetchAllSuppliers() {
    const data = this.supplierService.getAllSuppliers();
    return data;
  }

  @Get('fetch-one-supplier/:id')
  findOneSupplier(@Param('id') id: string) {
    const data = this.supplierService.findOneSupplier(id);
    return data;
  }
  @Post('create-supplier')
  createSupplier(@Body() createSuppDto: CreateSuppDto) {
    return this.supplierService.createSupplier(createSuppDto);
  }
  @Put('update-supplier/:id')
  updateSupplier(
    @Param('id') id: string,
    @Body() updateSuppDto: UpdateSuppDto,
  ) {
    return this.supplierService.updateSupplier(id, updateSuppDto);
  }
  @Delete('delete-supplier/:id')
  deleteSupplier(@Param('id') id: string) {
    return this.supplierService.deleteSupplier(id);
  }
}

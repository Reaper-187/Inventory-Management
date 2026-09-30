import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StockMovementsService } from '../services/stock-movements.service.js';
import { CreateStockMovementDto } from '../dtos/create-stock-movement.dto.js';
import { QueryStockMovementDto } from '../dtos/query-stock-movement.dto.js';

@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  create(@Body() createStockMovementDto: CreateStockMovementDto) {
    return this.stockMovementsService.create(createStockMovementDto);
  }

  @Get()
  findAll(@Query() queryStockMovementDto: QueryStockMovementDto) {
    return this.stockMovementsService.findAll(queryStockMovementDto);
  }
}

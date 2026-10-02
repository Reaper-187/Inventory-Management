import { Module } from '@nestjs/common';
import { StockMovementsController } from './controllers/stock-movements.controller.js';
import { StockMovementsService } from './services/stock-movements.service.js';

@Module({
  controllers: [StockMovementsController],
  providers: [StockMovementsService],
})
export class StockMovementsModule {}

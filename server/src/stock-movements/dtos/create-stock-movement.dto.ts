import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { MovementReason, MovementType } from '../../generated/prisma/enums.js';

export class CreateStockMovementDto {
  @IsUUID()
  productId!: string;

  @IsEnum(MovementType)
  type!: MovementType;

  @IsEnum(MovementReason)
  reason!: MovementReason;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  quantity!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  salePrice?: number;

  @IsOptional()
  @IsDateString()
  occurredAt?: string;
}

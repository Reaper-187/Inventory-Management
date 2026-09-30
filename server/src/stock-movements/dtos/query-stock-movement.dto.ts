import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { MovementType } from '../../generated/prisma/enums.js';

export class QueryStockMovementDto {
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsUUID('4', { each: true })
  productId?: string[];

  @IsOptional()
  @IsEnum(MovementType)
  type?: MovementType;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;
}

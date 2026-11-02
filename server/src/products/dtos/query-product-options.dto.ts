import { PickType } from '@nestjs/mapped-types';
import { QueryProductDto } from './query-product.dto.js';

export class QueryProductOptionsDto extends PickType(QueryProductDto, [
  'status',
] as const) {}

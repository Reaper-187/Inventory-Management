import { PartialType } from '@nestjs/mapped-types';
import { CreateSuppDto } from './createSupp.dto.js';

export class UpdateSuppDto extends PartialType(CreateSuppDto) {}

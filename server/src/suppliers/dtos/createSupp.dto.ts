import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSuppDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  contactPerson?: string | null;
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phone?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string | null;
}

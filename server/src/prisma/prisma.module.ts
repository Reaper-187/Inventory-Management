import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // dieses modul is überall verfügbar
@Module({
  // @Module = damit weis nest das diese Class ein nest-Module ist
  providers: [PrismaService], // damit erstellt nest den service
  exports: [PrismaService], // damit dürfen andere den service nutzen
})
export class PrismaModule {} // hier kommt keine logic rein ist nur ein Ordner für Nest

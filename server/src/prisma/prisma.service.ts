import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// das ist das neue prisma.ts wie damals bei express

@Injectable() // damit darf die Class verwaltet werden
// extends (veerbung) damit kan PrismaService alles was der Client kann

// OnModuleInit läuft wenn App starte
// 1. Anwendung startet
// 2. Module werden geladen
// 3. Services werden erstellt ===> %connect() zur DB geht auto los

// OnModuleDestroy läuft wenn App endet
// 4. Anwendung läuft
// 5. Anwendung wird beendet ==> $disconnect() DB verbindung wird gekillt
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  ss;
  constructor() {
    // Dieser Adapter verbindet Prisma mit dem PostgreSQL Treiber.
    const adapter = new PrismaPg({
      // Verbindungsschicht zwischen Prisma Client und PostgreSQL
      connectionString: process.env.DATABASE_URL,
    });

    super({
      // Hier wird PrismaClient mit Postgresql-config erstellt.
      adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
    console.log('DB is connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovementReason, MovementType } from '../../generated/prisma/enums.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateStockMovementDto } from '../dtos/create-stock-movement.dto.js';

const ALLOWED_REASONS: Record<MovementType, MovementReason[]> = {
  IN: [
    MovementReason.PURCHASE,
    MovementReason.RETURN_IN,
    MovementReason.CORRECTION,
  ],
  OUT: [MovementReason.SALE, MovementReason.DAMAGE, MovementReason.CORRECTION],
};

@Injectable()
export class StockMovementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStockMovementDto) {
    const { productId, type, reason, quantity, salePrice, occurredAt, note } =
      dto;

    if (!ALLOWED_REASONS[type].includes(reason)) {
      throw new BadRequestException(
        `Grund "${reason}" ist für Typ "${type}" nicht zulässig`,
      );
    }
    if (salePrice !== undefined && reason !== MovementReason.SALE) {
      throw new BadRequestException(
        'Verkaufspreis ist nur beim Grund "SALE" erlaubt',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updateResult = await tx.product.updateMany({
        where:
          type === MovementType.OUT
            ? { id: productId, currentStock: { gte: quantity } } // nur wenn genug Bestand da ist
            : { id: productId },
        data: {
          currentStock:
            type === MovementType.IN
              ? { increment: quantity }
              : { decrement: quantity },
        },
        // muss mit trx gemacht werden um den case zu DECKEN wenn 2 user gleichzeigtig etwas buchen
      });

      // updateMany meldet keinen Fehler, nur wie viele Zeilen getroffen wurden.
      // 0 Treffer ==> Produkt existiert nicht ODER Bestand reicht nicht aus.
      if (updateResult.count === 0) {
        const productExists = await tx.product.findUnique({
          where: { id: productId },
          select: { id: true },
        });

        if (!productExists) {
          throw new NotFoundException('Produkt nicht gefunden');
        }
        throw new ConflictException(
          'Bestand reicht für diese Buchung nicht aus',
        );
      }

      return tx.stockMovement.create({
        data: {
          productId,
          type,
          reason,
          quantity,
          note,
          salePrice,
          occurredAt: occurredAt ? new Date(occurredAt) : undefined,
        },
        include: {
          product: { select: { id: true, name: true, sku: true } },
        },
      });
    });
  }
}

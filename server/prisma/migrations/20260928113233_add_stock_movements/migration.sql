-- CreateEnum
CREATE TYPE "movement_type" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "movement_reason" AS ENUM ('PURCHASE', 'RETURN_IN', 'SALE', 'DAMAGE', 'CORRECTION');

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" "movement_type" NOT NULL,
    "reason" "movement_reason" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "salePrice" DECIMAL(10,2),
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stock_movements_productId_idx" ON "stock_movements"("productId");

-- CreateIndex
CREATE INDEX "stock_movements_occurredAt_idx" ON "stock_movements"("occurredAt");

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

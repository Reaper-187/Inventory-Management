import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useGetOneProduct } from "../../hooks/useGetOneProduct";
import { ChevronDown } from "lucide-react";

interface ProductionInfoModalProps {
  prodId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductionInfoModal = ({
  prodId,
  open,
  onOpenChange,
}: ProductionInfoModalProps) => {
  const { data, isPending } = useGetOneProduct(prodId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Produkt-Details</DialogTitle>
          <DialogDescription>
            Übersicht der hinterlegten Informationen
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <p className="text-sm text-muted-foreground">Wird geladen...</p>
        ) : data ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="font-medium text-muted-foreground">Name</dt>
            <dd>{data.name}</dd>

            <dt className="font-medium text-muted-foreground">SKU</dt>
            <dd>{data.sku}</dd>

            <dt className="font-medium text-muted-foreground">Beschreibung</dt>
            <dd>{data.description ?? "-"}</dd>

            <dt className="font-medium text-muted-foreground">Preis</dt>
            <dd>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(data.price)}
            </dd>

            <dt className="font-medium text-muted-foreground">
              Mindestbestand
            </dt>
            <dd>{data.minStock}</dd>

            <dt className="font-medium text-muted-foreground">
              Aktueller Bestand
            </dt>
            <dd>{data.currentStock}</dd>

            <dt className="font-medium text-muted-foreground">Kategorie</dt>
            <dd>{data.category.name}</dd>

            <dt className="font-medium text-muted-foreground">Erstellt am</dt>
            <dd>{new Date(data.createdAt).toLocaleString()}</dd>

            <dt className="font-medium text-muted-foreground">
              Aktualisiert am
            </dt>
            <dd>{new Date(data.updatedAt).toLocaleString()}</dd>
          </dl>
        ) : (
          <p className="text-sm text-destructive">Keine Daten gefunden.</p>
        )}

        {data && (
          <Collapsible className="mt-4">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border p-3 text-sm font-medium hover:bg-accent">
              <span>Lieferant</span>
              <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-md border p-3">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd>{data.supplier.name}</dd>

                <dt className="font-medium text-muted-foreground">E-Mail</dt>
                <dd>{data.supplier.email}</dd>

                <dt className="font-medium text-muted-foreground">
                  Kontaktperson
                </dt>
                <dd>{data.supplier.contactPerson ?? "-"}</dd>

                <dt className="font-medium text-muted-foreground">Telefon</dt>
                <dd>{data.supplier.phone ?? "-"}</dd>

                <dt className="font-medium text-muted-foreground">Adresse</dt>
                <dd>{data.supplier.address ?? "-"}</dd>
              </dl>
            </CollapsibleContent>
          </Collapsible>
        )}
      </DialogContent>
    </Dialog>
  );
};

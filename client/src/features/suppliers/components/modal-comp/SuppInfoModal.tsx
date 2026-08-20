import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetOneSupplier } from "../../hooks/useGetOneSupplier";

interface SuppInfoModalProps {
  supId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuppInfoModal = ({
  supId,
  open,
  onOpenChange,
}: SuppInfoModalProps) => {
  const { data, isPending } = useGetOneSupplier(supId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Lieferanten-Details</DialogTitle>
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

            <dt className="font-medium text-muted-foreground">Kontaktperson</dt>
            <dd>{data.contactPerson ?? "-"}</dd>

            <dt className="font-medium text-muted-foreground">Email</dt>
            <dd>{data.email}</dd>

            <dt className="font-medium text-muted-foreground">Telefon</dt>
            <dd>{data.phone ?? "-"}</dd>

            <dt className="font-medium text-muted-foreground">Adresse</dt>
            <dd>{data.address ?? "-"}</dd>

            <dt className="font-medium text-muted-foreground">Erstellt am</dt>
            <dd>{new Date(data.createdAt).toLocaleString()}</dd>
          </dl>
        ) : (
          <p className="text-sm text-destructive">Keine Daten gefunden.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

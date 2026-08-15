import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAlertProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string, options: { onSuccess: () => void }) => void;
  isPending: boolean;
}

export function DeleteAlert({
  id,
  open,
  onOpenChange,
  onDelete,
  isPending,
}: DeleteAlertProps) {
  const handleSubmit = () => {
    onDelete(id, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {isPending ? "wird bearbeitet" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            {isPending ? "loading" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

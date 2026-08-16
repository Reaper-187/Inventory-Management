import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supplierSchema } from "../../types/supplier.api.types";
import { useCreateSupplier } from "../../hooks/useCreateSupplier";
import { useUpdateSupplier } from "../../hooks/useUpdateSupplier";
import { useGetOneSupplier } from "../../hooks/useGetOneSupplier";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

type SupplierCreateFormValues = z.infer<typeof supplierSchema>;
type DialogType =
  | { mode: "create"; open: boolean; onOpenChange: (open: boolean) => void }
  | {
      mode: "edit";
      suppId: string;
      open: boolean;
      onOpenChange: (open: boolean) => void;
    };

export const SupplierDialog = (props: DialogType) => {
  const { mode, open, onOpenChange } = props;
  const suppId = mode === "edit" ? props.suppId : undefined;

  const { mutate: createNewSupp, isPending: createPending } =
    useCreateSupplier();
  const { mutate: updateSupp, isPending: updatePending } = useUpdateSupplier();
  const { data: initialfetchData, isPending: fetchSuppPending } =
    useGetOneSupplier(suppId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierCreateFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (initialfetchData && mode === "edit") {
      reset({
        name: initialfetchData.name ?? "",
        contactPerson: initialfetchData.contactPerson ?? "",
        email: initialfetchData.email ?? "",
        phone: initialfetchData.phone ?? "",
        address: initialfetchData.address ?? "",
      });
    }
  }, [initialfetchData, mode, reset]);

  const pendingType = mode === "create" ? createPending : updatePending;

  const onSubmit = (formData: SupplierCreateFormValues) => {
    {
      mode === "create"
        ? createNewSupp(formData, {
            onSuccess: () => {
              reset();
              onOpenChange(false);
            },
          })
        : updateSupp(
            { id: suppId as string, data: formData },
            {
              onSuccess: () => {
                reset();
                onOpenChange(false);
              },
            },
          );
    }
  };

  if (mode === "edit" && fetchSuppPending) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="supplier-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "Neue Lieferanten erstellen"
                : "Lieferant bearbeiten"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Erstelle einen Neuen Lieferanten"
                : "Bearbeite oder Lösche einen Lieferanten"}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Kategoriename eingeben"
                    disabled={pendingType}
                    {...field}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </Field>
              )}
            />
            <Controller
              name="contactPerson"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="contactPerson">Kontaktperson</Label>
                  <div className="space-y-1">
                    <Input
                      id="contactPerson"
                      placeholder="Optional eingeben"
                      disabled={pendingType}
                      {...field}
                      className={
                        errors.contactPerson
                          ? "border-destructive min-h-[100px] resize-y"
                          : ""
                      }
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-destructive">
                        {errors.contactPerson.message}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <div className="space-y-1">
                    <Input
                      id="email"
                      placeholder="Email eingeben"
                      disabled={pendingType}
                      {...field}
                      className={
                        errors.email
                          ? "border-destructive min-h-[100px] resize-y"
                          : ""
                      }
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="space-y-1">
                    <Input
                      id="phone"
                      placeholder="Optionale Phone-Nr. eingeben"
                      disabled={pendingType}
                      {...field}
                      className={
                        errors.phone
                          ? "border-destructive min-h-[100px] resize-y"
                          : ""
                      }
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="address">Addresse</Label>
                  <div className="space-y-1">
                    <Input
                      id="address"
                      placeholder="Optionale Addresse eingeben"
                      disabled={pendingType}
                      {...field}
                      className={
                        errors.address
                          ? "border-destructive min-h-[100px] resize-y"
                          : ""
                      }
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    onClick={() => reset()}
                    disabled={pendingType}
                  >
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" form="supplier-form" disabled={pendingType}>
                {pendingType ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                    {mode === "create"
                      ? "Wird erstellt..."
                      : "Wird aktualisiert..."}
                  </>
                ) : mode === "create" ? (
                  "Erstellen"
                ) : (
                  "Aktualisieren"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

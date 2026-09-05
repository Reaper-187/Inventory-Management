import { Controller, useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useGetOneProduct } from "../../hooks/useGetOneProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { CreateProd, type CreateProduct } from "../../types/product.api.types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategorieDropdown } from "@/features/categories";
import { SupplierDropdown } from "@/features/suppliers";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { clampNonNegativeNumber } from "../../utils/form.utils";
import { useUploadProductImage } from "../../hooks/useUploadProdImage";

type DialogType =
  | { mode: "create"; open: boolean; onOpenChange: (open: boolean) => void }
  | {
      mode: "edit";
      productId: string;
      open: boolean;
      onOpenChange: (open: boolean) => void;
    };

export const ProductDialog = (props: DialogType) => {
  const { mode, open, onOpenChange } = props;
  const productId = mode === "edit" ? props.productId : undefined;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: createNewProduct, isPending: createPending } =
    useCreateProduct();
  const { mutate: updateMutate, isPending: updatePending } = useUpdateProduct();
  const { mutate: uploadImage, isPending: uploadPending } =
    useUploadProductImage();
  const { data: initialFetchData, isPending: fetchProductPending } =
    useGetOneProduct(productId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: zodResolver(CreateProd),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      minStock: 0,
      currentStock: 1,
      categoryId: "",
      supplierId: "",
    },
  });

  useEffect(() => {
    if (initialFetchData && mode === "edit") {
      reset({
        name: initialFetchData.name,
        description: initialFetchData.description ?? "",
        price: initialFetchData.price,
        minStock: initialFetchData.minStock,
        currentStock: initialFetchData.currentStock,
        categoryId: initialFetchData.categoryId,
        supplierId: initialFetchData.supplierId,
      });
    }
  }, [initialFetchData, mode, reset]);

  const pendingType =
    (mode === "create" ? createPending : updatePending) || uploadPending;
  const onSubmit = (formData: CreateProduct) => {
    if (mode === "create") {
      createNewProduct(formData, {
        onSuccess: (newProduct) => {
          if (selectedFile) {
            uploadImage(
              { id: newProduct.id, file: selectedFile },
              {
                onSettled: () => {
                  reset();
                  setSelectedFile(null);
                  onOpenChange(false);
                },
              },
            );
          } else {
            reset();
            onOpenChange(false);
          }
        },
      });
    } else {
      updateMutate(
        { id: productId as string, data: formData },
        {
          onSuccess: () => {
            if (selectedFile) {
              uploadImage(
                { id: productId as string, file: selectedFile },
                {
                  onSettled: () => {
                    reset();
                    setSelectedFile(null);
                    onOpenChange(false);
                  },
                },
              );
            } else {
              reset();
              onOpenChange(false);
            }
          },
        },
      );
    }
  };

  if (mode === "edit" && fetchProductPending) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "Neues Produkt erstellen"
                : "Produkt bearbeiten"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Erstelle ein neues Produkt"
                : "Bearbeite oder Lösche ein Produkt"}
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
                    placeholder="Produktname eingeben"
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
              name="description"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="description">Beschreibung</Label>
                  <div className="space-y-1">
                    <Textarea
                      id="description"
                      placeholder="Optionale Beschreibung eingeben"
                      disabled={pendingType}
                      {...field}
                      className={
                        errors.description
                          ? "border-destructive min-h-[100px] resize-y"
                          : "min-h-[100px] resize-y"
                      }
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="categoryId">Kategorie</Label>

                  <CategorieDropdown
                    mode="single"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={pendingType}
                  />

                  {errors.categoryId && (
                    <p className="text-sm text-destructive">
                      {errors.categoryId.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="supplierId"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="supplierId">Lieferant</Label>
                  <SupplierDropdown
                    mode="single"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={pendingType}
                  />
                  {errors.supplierId && (
                    <p className="text-sm text-destructive">
                      {errors.supplierId.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="price">Preis</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    disabled={pendingType}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        clampNonNegativeNumber(e.target.valueAsNumber, 0),
                      )
                    }
                    className={errors.price ? "border-destructive" : ""}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="minStock"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="minStock">Mindestbestand</Label>
                  <Input
                    id="minStock"
                    type="number"
                    disabled={pendingType}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        clampNonNegativeNumber(e.target.valueAsNumber, 0),
                      )
                    }
                    className={errors.minStock ? "border-destructive" : ""}
                  />
                  {errors.minStock && (
                    <p className="text-sm text-destructive">
                      {errors.minStock.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="currentStock"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="currentStock">Aktueller Bestand</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    disabled={pendingType}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        clampNonNegativeNumber(e.target.valueAsNumber, 0),
                      )
                    }
                    className={errors.currentStock ? "border-destructive" : ""}
                  />
                  {errors.currentStock && (
                    <p className="text-sm text-destructive">
                      {errors.currentStock.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Field>
              <Label htmlFor="image">Produktbild</Label>
              <Input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={pendingType}
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              />
            </Field>
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
              <Button type="submit" form="product-form" disabled={pendingType}>
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

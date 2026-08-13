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
import { categorySchema } from "../../types/category.api.types";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { useGetOneCategory } from "../../hooks/useGetOneCategory";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import type z from "zod";

type CategoryCreateFormValues = z.infer<typeof categorySchema>;
type DialogType =
  | { mode: "create"; open: boolean; onOpenChange: (open: boolean) => void }
  | {
      mode: "edit";
      catId: string;
      open: boolean;
      onOpenChange: (open: boolean) => void;
    };

export function CategoryDialog(props: DialogType) {
  const { mode, open, onOpenChange } = props;
  const catId = mode === "edit" ? props.catId : undefined;

  const { mutate: createNewCat, isPending: createPending } =
    useCreateCategory();
  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateCategory();
  const { data: initialfetchData, isPending: fetchCatPending } =
    useGetOneCategory(catId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryCreateFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (initialfetchData && mode === "edit") {
      reset({
        name: initialfetchData.name,
        description: initialfetchData.description ?? "",
      });
    }
  }, [initialfetchData, mode, reset]);

  const pendingType = mode === "create" ? createPending : updatePending;

  const onSubmit = (formData: CategoryCreateFormValues) => {
    {
      mode === "create"
        ? createNewCat(formData, {
            onSuccess: () => {
              reset();
              onOpenChange(false);
            },
          })
        : updateMutate(
            { id: catId as string, data: formData },
            {
              onSuccess: () => {
                reset();
                onOpenChange(false);
              },
            },
          );
    }
  };

  if (mode === "edit" && fetchCatPending) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="category-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "Neue Kategorie erstellen"
                : "Kategorie bearbeiten"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Erstelle eine neue Kategorie"
                : "Bearbeite oder Lösche eine Kategorie"}
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
              <Button type="submit" form="category-form" disabled={pendingType}>
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
}

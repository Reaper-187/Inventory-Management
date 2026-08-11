import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema } from "../../types/category.api.types";
import type z from "zod";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { useGetOneCategory } from "../../hooks/useGetOneCategory";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type CategoryFormValues = z.infer<typeof categorySchema>;

interface DialogType {
  mode: "create" | "edit";
  catId?: string;
  categoryName?: string;
}

export function CategoryDialog({ mode, categoryName, catId }: DialogType) {
  const { mutate: createNewCat, isPending: createPending } =
    useCreateCategory();

  const { mutate: updateCat, isPending: updatePending } = useUpdateCategory();

  const { data: initialfetchData, isPending: fetchCatPending } =
    useGetOneCategory(catId);

  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialfetchData && mode === "edit") {
      reset({
        name: initialfetchData.name,
        description: initialfetchData.description ?? "",
      });
    }
  }, [initialfetchData, mode, reset]);

  const submitType = mode === "create" ? createNewCat : updateCat;
  const pendingType = mode === "create" ? createPending : updatePending;

  const onSubmit = (formData: CategoryFormValues) => {
    submitType(formData, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  if (mode === "edit" && fetchCatPending) {
    return <p>Kategorie wird geladen...</p>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="category-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger
          render={
            <Button variant="outline" className="w-full mb-1">
              {mode === "create" ? "create Category" : categoryName}
            </Button>
          }
        />
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
                  <Label htmlFor="username-1">Beschreibung</Label>
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
              <Button variant="destructive" disabled={pendingType}>
                Löschen
              </Button>
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

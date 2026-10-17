import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { format } from "date-fns";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { clampNonNegativeNumber } from "@/features/products/utils/form.utils";
import { useCreateMovement } from "../../hooks/useCreateMovement";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ALLOWED_REASONS,
  CreateStockMovement,
  type CreateStockMovement as CreateStockMovementType,
} from "../../types/stockMovements.api.types";
import { ProductSelect } from "@/features/products/components/product-select/ProductSelect";
import { REASON_LABELS } from "../constants/movement.labels";

interface StockMovementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProductId?: string;
}

export const StockMovementDialog = ({
  open,
  onOpenChange,
  defaultProductId,
}: StockMovementDialogProps) => {
  const { mutate, isPending } = useCreateMovement();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateStockMovementType>({
    resolver: zodResolver(CreateStockMovement),
    defaultValues: {
      productId: defaultProductId ?? "",
      type: "IN",
      reason: "PURCHASE",
      quantity: 1,
    },
  });

  const type = watch("type");
  const reason = watch("reason");

  useEffect(() => {
    if (!ALLOWED_REASONS[type].includes(reason)) {
      setValue("reason", ALLOWED_REASONS[type][0]);
    }
  }, [type]);

  const onSubmit = (values: CreateStockMovementType) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id="stock-movement-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Bestandsbewegung erfassen</DialogTitle>
            <DialogDescription>
              Buche einen Wareneingang oder -ausgang.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label>Typ</Label>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="IN" id="type-in" />
                      <Label htmlFor="type-in">Eingang</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="OUT" id="type-out" />
                      <Label htmlFor="type-out">Ausgang</Label>
                    </div>
                  </RadioGroup>
                </Field>
              )}
            />

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label>Grund</Label>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    className="flex flex-col gap-2"
                  >
                    {ALLOWED_REASONS[type].map((r) => (
                      <div key={r} className="flex items-center gap-2">
                        <RadioGroupItem value={r} id={`reason-${r}`} />
                        <Label htmlFor={`reason-${r}`}>
                          {REASON_LABELS[r]}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.reason && (
                    <p className="text-sm text-destructive">
                      {errors.reason.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="productId">Produkt</Label>
                  <ProductSelect
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending || !!defaultProductId}
                  />
                  {errors.productId && (
                    <p className="text-sm text-destructive">
                      {errors.productId.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="quantity">Menge</Label>
                  <Input
                    id="quantity"
                    type="number"
                    disabled={isPending}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        clampNonNegativeNumber(e.target.valueAsNumber, 1),
                      )
                    }
                    className={errors.quantity ? "border-destructive" : ""}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-destructive">
                      {errors.quantity.message}
                    </p>
                  )}
                </Field>
              )}
            />

            {reason === "SALE" && (
              <Controller
                name="salePrice"
                control={control}
                render={({ field }) => (
                  <Field>
                    <Label htmlFor="salePrice">Verkaufspreis</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      disabled={isPending}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          clampNonNegativeNumber(e.target.valueAsNumber, 1),
                        )
                      }
                      className={errors.salePrice ? "border-destructive" : ""}
                    />
                    {errors.salePrice && (
                      <p className="text-sm text-destructive">
                        {errors.salePrice.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            )}

            <Controller
              name="occurredAt"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label>Datum</Label>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isPending}
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "dd.MM.yyyy")
                            : "Jetzt"}
                        </Button>
                      }
                    ></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : undefined)
                        }
                        disabled={{ after: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />

            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label htmlFor="note">Notiz</Label>
                  <Textarea
                    id="note"
                    placeholder="Optionale Notiz"
                    disabled={isPending}
                    {...field}
                    className="min-h-[80px] resize-y"
                  />
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
                    disabled={isPending}
                  >
                    Abbrechen
                  </Button>
                }
              />
              <Button
                type="submit"
                form="stock-movement-form"
                disabled={isPending}
              >
                {isPending ? "Wird gebucht..." : "Buchen"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

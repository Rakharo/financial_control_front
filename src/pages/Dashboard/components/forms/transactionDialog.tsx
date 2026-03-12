/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import BaseDialog from "../../../../components/global/BaseDialog";
import BaseForm from "../../../../components/global/BaseForm";
import BaseInput from "../../../../components/global/BaseInput";
import type { iCategory } from "../../../../interfaces/CategoryInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import {
  type TransactionFormData,
  transactionSchema,
} from "../../utils/transactionSchema";
import BaseSelect from "../../../../components/global/BaseSelect";
import { useEffect } from "react";
import BaseNumberInput from "../../../../components/global/BaseNumberInput";

export default function TransactionDialog(props: {
  open: boolean;
  isEdit?: boolean;
  categoriesList: iCategory[];
  initialData?: any;
  onClose: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void> | void;
}) {
  const defaultValues: DefaultValues<TransactionFormData> = {
    title: "",
    amount: "",
    category_id: "",
    type: "",
    frequency: "",
    ...props.initialData,
  };
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const typesList = [
    { value: "income", label: "Receita" },
    { value: "expense", label: "Despesa" },
  ];

  const frequencyList = [
    { value: "fixed", label: "Fixo" },
    { value: "variable", label: "Variado" },
  ];

  useEffect(() => {
    if (props.open) {
      form.reset({ ...defaultValues, ...props.initialData });
    }
    if (!props.open) {
      form.reset(defaultValues);
    }
  }, [props.open, props.initialData, form]);

  return (
    <BaseDialog
      open={props.open}
      onClose={() => props.onClose(false)}
      title={props.isEdit ? "Editar transação" : "Nova transação"}
      description={
        props.isEdit
          ? "Altere os dados da transação."
          : "Preencha os dados para registrar uma nova transação."
      }
      firstBtnText="Cancelar"
      firstBtnColor="neutral"
      firstBtnVariant="text"
      secondBtnText={props.isEdit ? "Salvar" : "Criar"}
      secondBtnColor="primary"
      secondBtnVariant="contained"
      onFirstBtnClick={() => props.onClose(false)}
      onSecondBtnClick={form.handleSubmit(props.onSubmit)}
    >
      <Box>
        <BaseForm methods={form} onSubmit={form.handleSubmit(props.onSubmit)}>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseInput
                {...field}
                label="Nome"
                placeholder="Nome da transação"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseNumberInput
                label="Valor"
                value={field.value}
                min={0}
                required
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="category_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseSelect
                label="Categoria"
                value={field.value ?? ""}
                options={props.categoriesList}
                required
                searchable
                onChange={(value) => field.onChange(value)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                groupBy={(c) =>
                  c.user_id === 0 ? "Categorias do sistema" : "Suas categorias"
                }
              />
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseSelect
                label="Tipo"
                value={field.value ?? ""}
                options={typesList}
                required
                onChange={(value) => field.onChange(value)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            )}
          />

          <Controller
            name="frequency"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseSelect
                label="Frequência"
                value={field.value ?? ""}
                options={frequencyList}
                required
                onChange={(value) => field.onChange(value)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            )}
          />
        </BaseForm>
      </Box>
    </BaseDialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseDialog from "../../../../components/global/BaseDialog";
import {
  type CategoryFormData,
  categorySchema,
} from "../../utils/categorySchema";
import BaseForm from "../../../../components/global/BaseForm";
import BaseInput from "../../../../components/global/BaseInput";
import BaseSelect from "../../../../components/global/BaseSelect";
import { useEffect } from "react";

type Props = {
  open: boolean;
  isEdit?: boolean;
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function CategoryDialog(props: Props) {
  const defaultValues: CategoryFormData = {
    name: "",
    type: "",
    ...props.initialData,
  };
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onSubmit",
  });

  const typesList = [
    { value: "income", label: "Receita" },
    { value: "expense", label: "Despesa" },
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
      onClose={() => props.onClose()}
      title={props.isEdit ? "Editar categoria" : "Nova categoria"}
      description={
        props.isEdit
          ? "Altere os dados da categoria."
          : "Preencha os dados para registrar uma nova categoria."
      }
      firstBtnText="Cancelar"
      firstBtnColor="neutral"
      firstBtnVariant="text"
      secondBtnText={props.isEdit ? "Salvar" : "Criar"}
      secondBtnColor="primary"
      secondBtnVariant="contained"
      onFirstBtnClick={() => props.onClose()}
      onSecondBtnClick={form.handleSubmit(props.onSubmit)}
    >
      <Box>
        <BaseForm methods={form} onSubmit={form.handleSubmit(props.onSubmit)}>
          <Controller
            name="name"
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
        </BaseForm>
      </Box>
    </BaseDialog>
  );
}

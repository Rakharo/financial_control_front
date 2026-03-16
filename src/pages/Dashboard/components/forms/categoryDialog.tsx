/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Popover, Divider, Chip } from "@mui/material";
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
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";

type Props = {
  open: boolean;
  isEdit?: boolean;
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function CategoryDialog(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const defaultValues: CategoryFormData = {
    name: "",
    type: "",
    color: "#1976d2",
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

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Cor da categoria</Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                cursor: "pointer",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: form.watch("color") ?? "#1976d2",
                  border: "2px solid #ddd",
                }}
              />

              <Typography variant="body2">Escolher cor</Typography>
            </Box>
          </Box>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  p: 2,
                  minWidth: 220,
                },
              },
            }}
          >
            <CirclePicker
              color={form.watch("color")}
              onChange={(color) => form.setValue("color", color.hex)}
            />
          </Popover>

          <Divider />

          <Chip
            label={form.watch("name").toUpperCase() || "Prévia"}
            sx={{
              mt: 2,
              backgroundColor: form.watch("color"),
              color: "#fff",
              width: "max-content",
              alignSelf: "center",
            }}
          />
        </BaseForm>
      </Box>
    </BaseDialog>
  );
}

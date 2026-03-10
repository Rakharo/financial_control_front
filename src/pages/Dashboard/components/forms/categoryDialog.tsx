import { TextField, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseDialog from "../../../../components/global/BaseDialog";
import { type CategoryFormData, categorySchema } from "../../utils/categorySchema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  initialData?: CategoryFormData;
};

export default function CategoryDialog(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: props.initialData || {
      Name: "",
      Type: "expense",
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <BaseDialog
        open={props.open}
        onClose={props.onClose}
        title={props.initialData ? "Editar Categoria" : "Nova Categoria"}
        firstBtnText="Cancelar"
        secondBtnText="Salvar"
        onFirstBtnClick={props.onClose}
      >
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nome"
            {...register("Name")}
            error={!!errors.Name}
            helperText={errors.Name?.message}
            fullWidth
          />

          <TextField
            select
            label="Tipo"
            defaultValue="expense"
            {...register("Type")}
          >
            <MenuItem value="income">Receita</MenuItem>
            <MenuItem value="expense">Despesa</MenuItem>
          </TextField>
        </Stack>
      </BaseDialog>
    </form>
  );
}
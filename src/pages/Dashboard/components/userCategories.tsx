import { Add, Delete, Edit } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iCategory } from "../../../interfaces/CategoryInterface";
import { useThemeMode } from "../../../contexts/ThemeContext";

export default function UserCategories(props: {
  data: iCategory[];
  page: number;
  limit: number;
  totalPages: number;
  openDialog: () => void;
  editData: (data: iCategory) => void;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  deleteData: (data: iCategory) => void;
}) {
  const { mode } = useThemeMode();
  return (
    <BaseCard
      cardTitle="Minhas Categorias"
      contentStyle={{ gap: 1, maxHeight: "50dvh", overflow: "auto" }}
      cardTitleAction
      cardTitleBtnText="Nova Categoria"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => props.openDialog()}
    >
      <BaseTable
        data={props.data}
        selectable
        selectionMode="single"
        getRow={(row) => row}
        renderBulkActions={(selected) =>
          selected[0].user_id === 0 ? (
            "-"
          ) : (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                backgroundColor:
                  mode === "dark" ? "primary.dark" : "rgba(255, 255, 255, 0.7)",
                borderRadius: "1rem",
              }}
            >
              <BaseTooltip content="Editar" arrow>
                <BaseButton
                  isIconBtn
                  icon={<Edit />}
                  color="secondary"
                  onClick={() => props.editData(selected[0])}
                />
              </BaseTooltip>
              <BaseTooltip content="Deletar" arrow>
                <BaseButton
                  isIconBtn
                  icon={<Delete />}
                  color="error"
                  onClick={() => props.deleteData(selected[0])}
                />
              </BaseTooltip>
            </Stack>
          )
        }
        pagination={{
          page: props.page,
          limit: props.limit,
          total: props.totalPages,
          onPageChange: props.onPageChange,
          onLimitChange: props.onLimitChange,
        }}
        columns={[
          {
            title: "Nome",
            key: "name",
            render: (item) => (
              <BaseTooltip content={item.name}>
                <Typography
                  noWrap
                  sx={{
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "default",
                  }}
                >
                  {item.name.toUpperCase()}
                </Typography>
              </BaseTooltip>
            ),
          },
          {
            title: "Criada em",
            align: "center",
            key: "created_at",
            render: (item) =>
              item.user_id === 0 ? "-" : formatDateBR(item.created_at!),
          },
          {
            title: "Tipo",
            align: "center",
            key: "type",
            render: (item) =>
              item.type === "income" ? (
                <Chip label="Receita" color="primary" sx={{ width: "100%" }} />
              ) : (
                <Chip label="Despesa" color="error" sx={{ width: "100%" }} />
              ),
          },
          {
            title: "Origem",
            align: "center",
            sortable: true,
            key: "user_id",
            render: (item) =>
              item.user_id === 0 ? (
                <Chip label="Sistema" color="default" sx={{ width: "100%" }} />
              ) : (
                <Chip
                  label="Usuário"
                  color="secondary"
                  sx={{ width: "100%" }}
                />
              ),
          },
        ]}
      />
    </BaseCard>
  );
}

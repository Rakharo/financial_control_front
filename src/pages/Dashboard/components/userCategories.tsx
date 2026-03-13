import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Chip, Divider, Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iCategory } from "../../../interfaces/CategoryInterface";

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
            render: (item) => item.name.toUpperCase(),
          },
          {
            title: "Criada em",
            align: "center",
            key: "created_at",
            render: (item) => item.user_id === 0 ? "-" : formatDateBR(item.created_at!),
          },
          {
            title: "Tipo",
            align: "center",
            key: "type",
            render: (item) =>
              item.type === "income" ? (
                <Chip label="Receita" color="success" sx={{ width: "100%" }} />
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
          {
            title: "Ações",
            align: "center",
            render: (item) => (
              <>
                {item.user_id === 0 ? (
                  "-"
                ) : (
                  <Stack
                    justifyContent="center"
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <BaseTooltip content="Editar" arrow placement="left">
                      <BaseButton
                        isIconBtn
                        icon={<EditOutlined fontSize="small" />}
                        onClick={() => props.editData(item)}
                      />
                    </BaseTooltip>
                    <BaseTooltip content="Deletar" arrow placement="right">
                      <BaseButton
                        isIconBtn
                        icon={<Delete fontSize="small" color="error" />}
                        onClick={() => props.deleteData(item)}
                      />
                    </BaseTooltip>
                  </Stack>
                )}
              </>
            ),
          },
        ]}
      />
    </BaseCard>
  );
}

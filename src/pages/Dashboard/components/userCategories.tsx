import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Chip, Divider, Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iCategoryResponse } from "../../../interfaces/CategoryInterface";

export default function UserCategories(props: {
  data: iCategoryResponse[];
  openDialog: () => void;
  editData: (data: iCategoryResponse) => void;
}) {
  return (
    <BaseCard
      cardTitle="Minhas Categorias"
      contentStyle={{ gap: 1, maxHeight: "50dvh", overflow: "auto"}}
      cardTitleAction
      cardTitleBtnText="Nova Categoria"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => props.openDialog()}
    >
      <BaseTable
        data={props.data}
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
            render: (item) => formatDateBR(item.created_at!),
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
            render: (item) => (item.user_id === 0 ? "Sistema" : "Usuário"),
          },
          {
            title: "Ações",
            align: "center",
            render: (item) => (
              <>
                {item.user_id === 0 ? '-' : (
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
                        onClick={() => console.log(item)}
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

import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iCategoryResponse } from "../../../interfaces/CategoryInterface";

export default function UserCategories(props: {
    data: iCategoryResponse[];
}) {
  return (
    <BaseCard
      cardTitle="Minhas Categorias"
      contentStyle={{ gap: 1 }}
      cardTitleAction
      cardTitleBtnText="Nova Categoria"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => console.log("clicou")}
    >
      <BaseTable
        data={props.data}
        columns={[
          { title: "Nome", key: "Name" },
          {
            title: "Criada em",
            key: "Created_at",
            render: (item) => formatDateBR(item.Created_at!),
          },
          {
            title: "Tipo",
            key: "Type",
            render: (item) =>
              item.Type === "income" ? (
                <Chip label="Receita" color="success" sx={{ width: "100%" }} />
              ) : (
                <Chip label="Despesa" color="error" sx={{ width: "100%" }} />
              ),
          },
          {
            title: "Ações",
            render: (item) => (
              <Stack>
                <BaseTooltip content="Editar" arrow placement="left">
                  <BaseButton
                    isIconBtn
                    icon={<EditOutlined fontSize="small" />}
                    onClick={() => console.log(item)}
                  />
                </BaseTooltip>
                <BaseTooltip content="Deletar" arrow placement="left">
                  <BaseButton
                    isIconBtn
                    icon={<Delete fontSize="small" color="error" />}
                    onClick={() => console.log(item)}
                  />
                </BaseTooltip>
              </Stack>
            ),
          },
        ]}
      />
    </BaseCard>
  );
}

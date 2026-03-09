/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";

export function LastTransactions(props: { data: any[] }) {
  return (
    <BaseCard
      cardTitle="Últimos lançamentos"
      contentStyle={{ gap: 1 }}
      cardTitleAction
      cardTitleBtnText="Novo Lançamento"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => console.log("clicou")}
    >
      <BaseTable
        data={props.data}
        columns={[
          { title: "Nome", key: "Title" },
          {
            title: "Valor",
            key: "Amount",
            render: (item) => `R$ ${item.Amount.toFixed(2)}`,
          },
          {
            title: "Categoria",
            key: "Category",
            render: (item) => item.Category.Name.toUpperCase(),
          },
          {
            title: "Criada em",
            key: "CreatedAt",
            render: (item) => formatDateBR(item.CreatedAt),
          },
          { title: "Tipo", key: "Type", render: (item) => (
            item.Type === "income" ? (
                <Chip label="Receita" color="success" sx={{width: "100%"}} />
            ) : (
                <Chip label="Despesa" color="error" sx={{width: "100%"}} />
            )
          )},
          { title: "Frequência", key: "Frequency", render: (item) => (
            item.Frequency === "variable" ? "Variado" : "Fixo"
          )},
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

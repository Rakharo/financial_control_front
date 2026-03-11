import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Chip, Divider, Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iTransactionResponse } from "../../../interfaces/TransactionInterface";

export function LastTransactions(props: {
  data: iTransactionResponse[];
  openDialog: () => void;
  editData: (data: iTransactionResponse) => void;
}) {
  return (
    <BaseCard
      cardTitle="Últimos lançamentos"
      contentStyle={{ gap: 1, maxHeight: '50dvh'}}
      cardTitleAction
      cardTitleBtnText="Novo Lançamento"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => props.openDialog()}
    >
      <BaseTable
        data={props.data}
        columns={[
          { title: "Nome", key: "title" },
          {
            title: "Valor",
            align: "center",
            key: "amount",
            render: (item) => `R$ ${item.amount.toFixed(2)}`,
          },
          {
            title: "Categoria",
            align: "center",
            key: "category",
            render: (item) => item.category.name.toUpperCase(),
          },
          {
            title: "Criada em",
            align: "center",
            key: "created_at",
            render: (item) => formatDateBR(item.created_at),
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
            title: "Frequência",
            align: "center",
            key: "frequency",
            render: (item) =>
              item.frequency === "variable" ? "Variado" : "Fixo",
          },
          {
            title: "Ações",
            align: "center",
            render: (item) => (
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
            ),
          },
        ]}
      />
    </BaseCard>
  );
}

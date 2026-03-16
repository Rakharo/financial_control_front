import { Add, Delete, Edit } from "@mui/icons-material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";
import type { iTransaction } from "../../../interfaces/TransactionInterface";
import { Chip, Stack, Typography } from "@mui/material";
import { useThemeMode } from "../../../contexts/ThemeContext";

export function LastTransactions(props: {
  data: iTransaction[];
  page: number;
  limit: number;
  totalPages: number;
  openDialog: () => void;
  editData: (data: iTransaction) => void;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  deleteData: (data: iTransaction) => void;
}) {
  const { mode } = useThemeMode();

  return (
    <BaseCard
      cardTitle="Últimos lançamentos"
      contentStyle={{ gap: 1, maxHeight: "60dvh" }}
      cardTitleAction
      cardTitleBtnText="Novo Lançamento"
      cardTitleBtnIcon={<Add fontSize="small" />}
      cardTitleOnClick={() => props.openDialog()}
    >
      <BaseTable
        data={props.data}
        selectable
        selectionMode="single"
        getRow={(row) => row}
        renderBulkActions={(selected) => (
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
        )}
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
            key: "title",
            render: (item) => (
              <BaseTooltip content={item.title}>
                <Typography
                  noWrap
                  sx={{
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "default",
                  }}
                >
                  {item.title}
                </Typography>
              </BaseTooltip>
            ),
          },
          {
            title: "Valor",
            align: "center",
            key: "amount",
            render: (item) => `R$ ${item.amount.toFixed(2)}`,
          },
          {
            title: "Parcelas",
            align: "center",
            key: "installment_number",
            render: (item) =>
              item.installment_plan_id
                ? `${item?.installment_number}/${item?.installment_total}`
                : "-",
          },
          {
            title: "Valor Parcela",
            align: "center",
            key: "installment_value",
            render: (item) =>
              item.installment_plan_id
                ? `R$ ${item?.installment_value?.toFixed(2)}`
                : "-",
          },
          {
            title: "Categoria",
            align: "center",
            key: "category",
            render: (item) => (
              <BaseTooltip content={item.category.name}>
                <Chip
                  label={item.category.name.toUpperCase()}
                  sx={{
                    color: item.category.user_id === 0 ? "default" : "secondary.contrastText",
                    backgroundColor: item.category.user_id === 0 ? "default" : item.category.color,
                    width: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "default",
                  }}
                />
              </BaseTooltip>
            ),
          },
          {
            title: "Criada em",
            align: "center",
            key: "created_at",
            render: (item) => formatDateBR(item.created_at),
          },
          {
            title: "Data de lançamento",
            align: "center",
            key: "transaction_date",
            render: (item) => formatDateBR(item.transaction_date),
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
            title: "Frequência",
            align: "center",
            key: "frequency",
            render: (item) =>
              item.frequency === "variable" ? "Variado" : "Fixo",
          },
        ]}
      />
    </BaseCard>
  );
}

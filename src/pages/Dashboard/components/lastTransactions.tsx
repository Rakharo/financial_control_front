/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, EditOutlined, Delete } from "@mui/icons-material";
import { Stack } from "@mui/material";
import BaseButton from "../../../components/global/BaseButton";
import BaseCard from "../../../components/global/BaseCard";
import BaseTable from "../../../components/global/BaseTable";
import BaseTooltip from "../../../components/global/BaseTooltip";
import { formatDateBR } from "../../../utils/formatter";

export function LastTransactions(props: {
    data: any[];
}) {
    return (
        
        <BaseCard cardTitle="Últimos lançamentos" contentStyle={{gap: 1}}>
          <BaseButton btnText="Novo Lançamento" sx={{alignSelf: 'flex-end'}} startIcon={<Add fontSize="small" />} />
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
                render: (item) => item.Category.Name,
              },
              { title: "Criada em", key: "CreatedAt", render: (item) => formatDateBR(item.CreatedAt)},
              { title: "Tipo", key: "Type" },
              { title: "Frequência", key: "Frequency" },
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
    )
}
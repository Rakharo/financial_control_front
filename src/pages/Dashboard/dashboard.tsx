import { Box, Divider, Stack } from "@mui/material";
import { useSummary, useTransactionsList } from "../../hooks/useTransactions";
import Summary from "./components/summary";
import BaseCard from "../../components/global/BaseCard";
import { LastTransactions } from "./components/lastTransactions";

export default function Dashboard() {
  const { data: summaryData, isLoading: summaryLoading } = useSummary();
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionsList();

  if (summaryLoading && transactionLoading) {
    return <div>Carregando...</div>;
  }

  console.log(transactionData);
  return (
    <Stack>
      <Summary data={summaryData} />
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ marginTop: "2em" }}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <LastTransactions data={transactionData} />

        <BaseCard cardTitle="Minhas categorias">
          <Box>
            
          </Box>
        </BaseCard>        

        <BaseCard cardTitle="Outras informações">
          <Box>
            
          </Box>
        </BaseCard>    
      </Stack>
    </Stack>
  );
}

import { Box, Divider, Stack } from "@mui/material";
import { useSummary, useTransactionsList } from "../../hooks/useTransactions";
import Summary from "./components/summary";
import BaseCard from "../../components/global/BaseCard";
import { LastTransactions } from "./components/lastTransactions";
import { useCategoryList } from "../../hooks/useCategory";
import UserCategories from "./components/userCategories";

export default function Dashboard() {
  const { data: summaryData, isLoading: summaryLoading } = useSummary();
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionsList();

  const { data: categoryData, isLoading: categoryLoading } = useCategoryList();

  if (summaryLoading && transactionLoading && categoryLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Stack>
      <Summary data={summaryData!} />
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ marginTop: "2em" }}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <LastTransactions data={transactionData!} />

        <UserCategories data={categoryData!} />      

        <BaseCard cardTitle="Outras informações">
          <Box>
            
          </Box>
        </BaseCard>    
      </Stack>
    </Stack>
  );
}

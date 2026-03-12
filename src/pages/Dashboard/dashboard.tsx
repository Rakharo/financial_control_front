/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Stack, Typography } from "@mui/material";
import Summary from "./components/summary";
import { LastTransactions } from "./components/lastTransactions";
import UserCategories from "./components/userCategories";
import {
  useCategoryList,
  useCreateCategory,
  useUpdateCategory,
} from "../../hooks/useCategory";
import {
  useCreateTransaction,
  useSummary,
  useTransactionsList,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useState } from "react";
import TransactionDialog from "./components/forms/transactionDialog";
import CategoryDialog from "./components/forms/categoryDialog";
import type { iTransaction } from "../../interfaces/TransactionInterface";
import type { iCategoryResponse } from "../../interfaces/CategoryInterface";
import dayjs, { Dayjs } from "dayjs";
import BaseDatePicker from "../../components/global/BaseDatePicker";

export default function Dashboard() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<iTransaction | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<iCategoryResponse | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [filterDate, setFilterDate] = useState<Dayjs | null>(dayjs());

  const { data: summaryData, isLoading: summaryLoading } = useSummary({
    month: filterDate ? filterDate.month() + 1 : undefined,
    year: filterDate ? filterDate.year() : undefined,
  });
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionsList({
      page,
      limit,
      month: filterDate ? filterDate.month() + 1 : undefined,
      year: filterDate ? filterDate.year() : undefined,
    });
  const { data: categoryData, isLoading: categoryLoading } = useCategoryList();

  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const createCategory = useCreateCategory();
  const updatedCategory = useUpdateCategory();

  function handleSubmitTransaction(data: any) {
    if (!editingTransaction) {
      createTransaction.mutate(data);
    } else {
      updateTransaction.mutate({
        id: editingTransaction.id,
        data: data,
      });
    }
    setOpenTransaction(false);
  }

  const handleCreateCategory = (data: any) => {
    if (!editingCategory) {
      createCategory.mutate(data);
    } else {
      updatedCategory.mutate({
        id: editingCategory.id,
        data: data,
      });
    }
    setOpenCategory(false);
  };

  if (summaryLoading && transactionLoading && categoryLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="h5">Dashboard</Typography>

        <BaseDatePicker
          label="Período"
          value={filterDate}
          onChange={setFilterDate}
          format="MM/YYYY"
          views={["year", "month"]}
          size="small"
        />
      </Stack>
      <Summary data={summaryData!} />
      <Grid container spacing={2} sx={{ maxHeight: "100dvh" }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <LastTransactions
            data={transactionData?.transactions || []}
            openDialog={() => setOpenTransaction(true)}
            editData={(data: iTransaction) => {
              setEditingTransaction(data);
              setOpenTransaction(true);
            }}
            page={page || 1}
            limit={limit || 10}
            onLimitChange={(value) => setLimit(value)}
            onPageChange={(value) => setPage(value)}
            totalPages={transactionData?.total || 0}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <UserCategories
            data={categoryData || []}
            openDialog={() => setOpenCategory(true)}
            editData={(data: iCategoryResponse) => {
              setEditingCategory(data);
              setOpenCategory(true);
            }}
          />
        </Grid>
      </Grid>

      <TransactionDialog
        open={openTransaction}
        onClose={() => {
          setOpenTransaction(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmitTransaction}
        categoriesList={categoryData || []}
        initialData={
          editingTransaction
            ? {
                ...editingTransaction,
                category_id: editingTransaction.category.id,
              }
            : null
        }
        isEdit={editingTransaction !== null}
      />

      <CategoryDialog
        open={openCategory}
        onClose={() => {
          setOpenCategory(false);
          setEditingCategory(null);
        }}
        onSubmit={handleCreateCategory}
        initialData={
          editingCategory
            ? {
                ...editingCategory,
              }
            : null
        }
        isEdit={editingCategory !== null}
      />
    </Stack>
  );
}

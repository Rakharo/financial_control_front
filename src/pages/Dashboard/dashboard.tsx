/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Stack } from "@mui/material";
import Summary from "./components/summary";
import { LastTransactions } from "./components/lastTransactions";
import UserCategories from "./components/userCategories";
import { useCategoryList, useCreateCategory, useUpdateCategory } from "../../hooks/useCategory";
import {
  useCreateTransaction,
  useSummary,
  useTransactionsList,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useState } from "react";
import TransactionDialog from "./components/forms/transactionDialog";
import CategoryDialog from "./components/forms/categoryDialog";
import type { iTransactionResponse } from "../../interfaces/TransactionInterface";
import type { iCategoryResponse } from "../../interfaces/CategoryInterface";

export default function Dashboard() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<iTransactionResponse | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<iCategoryResponse | null>(null);

  const { data: summaryData, isLoading: summaryLoading } = useSummary();
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionsList();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const createCategory = useCreateCategory();
  const updatedCategory = useUpdateCategory();

  const { data: categoryData, isLoading: categoryLoading } = useCategoryList();

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
    if(!editingCategory) {
      createCategory.mutate(data);
    } else {
      updatedCategory.mutate({
        id: editingCategory.id,
        data: data
      })
    }
    setOpenCategory(false);
  };

  if (summaryLoading && transactionLoading && categoryLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Stack spacing={2}>
      <Summary data={summaryData!} />
      <Grid container spacing={2} sx={{ maxHeight: "100dvh" }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <LastTransactions
            data={transactionData || []}
            openDialog={() => setOpenTransaction(true)}
            editData={(data: iTransactionResponse) => {
              setEditingTransaction(data);
              setOpenTransaction(true);
            }}
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
